using Ogress.Sourcebook.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Ogress.Sourcebook.Lists;

public sealed class EnumListProvider : IListProvider
{
    private readonly List<ListEntry> entries = new();

    public void Initialize(List<OptionEntry>? options)
    {
        var enumType = options?.FirstOrDefault(o => o.Name == "enumType");

        if (enumType is null)
            throw new SourcebookException($"Missing required option \"enumType\" for {nameof(EnumListProvider)}");

        var typ = Type.GetType(enumType.Value, throwOnError: false);
        
        if (typ is null || !typ.IsEnum)
            throw new SourcebookException($"Invalid type of enum for {nameof(EnumListProvider)}");

        var values = Enum.GetValues(typ);
        var fields = typ.GetFields(BindingFlags.Public | BindingFlags.Static);

        for (var i = 0; i < values.Length; i++)
        {
            var attr = Attribute.GetCustomAttribute(fields[i], typeof(DisplayAttribute)) as DisplayAttribute;
            var nam = attr is null ? fields[i].Name : attr.Name!;
            var val = (int)values.GetValue(i)!;
            entries.Add(new ListEntry(nam, val.ToString()));
        }
    }

    public IEnumerable<ListEntry> GetEntries() => entries;
}
