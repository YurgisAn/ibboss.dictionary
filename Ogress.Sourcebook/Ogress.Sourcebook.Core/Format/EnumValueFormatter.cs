using Ogress.Sourcebook.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace Ogress.Sourcebook.Format;

public sealed class EnumValueFormatter : IValueFormatter
{
    private readonly Dictionary<int, string> enumValues = new();
    private string defaultFormat = null!;

    public void Initialize(List<FormatterOption>? options)
    {
        if (options == null)
            throw new SourcebookException($"Missing required options for {nameof(EnumValueFormatter)}");

        var enumType = options.FirstOrDefault(o => o.Name == "enumType");
        var def = options.FirstOrDefault(o => o.Name == "default");

        if (enumType is null)
            throw new SourcebookException($"Missing required option \"enumType\" for {nameof(EnumValueFormatter)}");

        if (def is null)
            throw new SourcebookException($"Missing required option \"default\" for {nameof(EnumValueFormatter)}");

        defaultFormat = def.Value;
        var typ = Type.GetType(enumType.Value, throwOnError: false);

        if (typ is null || !typ.IsEnum)
            throw new SourcebookException($"Invalid type of enum for {nameof(EnumValueFormatter)}");

        var values = Enum.GetValues(typ);
        var fields = typ.GetFields(BindingFlags.Public | BindingFlags.Static);

        for (var i = 0; i < values.Length; i++)
        {
            var attr = Attribute.GetCustomAttribute(fields[i], typeof(DisplayAttribute)) as DisplayAttribute;
            var nam = attr is null ? fields[i].Name : attr.Name!;
            enumValues.Add((int)values.GetValue(i)!, nam);
        }
    }

    public string Format(object value, string? format)
    {
        var str = value?.ToString();

        if (!string.IsNullOrEmpty(str) && int.TryParse(str, out var i )
            && enumValues.TryGetValue(i, out var res))
            return res;

        return string.Format(defaultFormat, str);
    }
}
