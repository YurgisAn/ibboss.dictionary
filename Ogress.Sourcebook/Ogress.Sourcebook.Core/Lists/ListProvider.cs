using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Lists;

public static class ListProvider
{
    private static readonly Dictionary<string, Type> providers = new(StringComparer.OrdinalIgnoreCase)
    {
        { "enum", typeof(EnumListProvider) },
        { "json", typeof(JsonListProvider) }
    };
    private static readonly Dictionary<string, IListProvider> cache = new Dictionary<string, IListProvider>(StringComparer.OrdinalIgnoreCase);

    public static IListProvider GetListProvider(BookInfo info, string key)
    {
        var provInfo = info.ListProviders.FirstOrDefault(p => p.Name == key);

        if (provInfo is null)
            throw new SourcebookException($"Unknown list provider \"{key}\".");

        IListProvider prov;
        var fullKey = $"{info.Name}.{provInfo.Name}";

        if (!cache.TryGetValue(fullKey, out prov!))
        {
            if (!providers.TryGetValue(provInfo.Type, out var provType))
                throw new SourcebookException($"Unknown list provider type \"{provInfo.Type}\".");

            try
            {
                prov = (IListProvider)Activator.CreateInstance(provType)!;
            }
            catch (Exception ex)
            {
                throw new SourcebookException($"Unable to initialize list provider of type \"{provInfo.Type}\"", ex);
            }

            prov.Initialize(provInfo.Options);
            cache[fullKey] = prov;
        }

        return prov;
    }
}
