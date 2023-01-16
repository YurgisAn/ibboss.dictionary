using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Lists;

public sealed class JsonListProvider : IListProvider
{
    private List<ListEntry> entries = null!;

    public void Initialize(List<OptionEntry>? options)
    {
        if (options is null || options.Count == 0)
            throw new SourcebookException($"Missing list entries for {nameof(JsonListProvider)}.");

        entries = options.Select(v => new ListEntry(v.Name, v.Value)).ToList();
    }

    public IEnumerable<ListEntry> GetEntries() => entries;
}
