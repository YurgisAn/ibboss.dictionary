using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Format;

public sealed class ValueFormatter : IValueFormatter
{
    private const string DefaultFormatter = "default";
    private static readonly IValueFormatter defaultFormatter = new ValueFormatter();

    private static readonly IDictionary<string, Type> formatters = new Dictionary<string, Type>(StringComparer.OrdinalIgnoreCase)
    {
        { "enum", typeof(EnumValueFormatter) }
    };
    private static readonly IDictionary<string, IValueFormatter> cache = new Dictionary<string, IValueFormatter>(StringComparer.OrdinalIgnoreCase);

    private ValueFormatter() { }

    public static IValueFormatter GetFormatter(BookInfo info, string? key)
    {
        if (key is null || key == DefaultFormatter)
            return defaultFormatter;

        var fmtInfo = info.Formatters.FirstOrDefault(f => f.Name == key);

        if (fmtInfo is null)
            throw new SourcebookException($"Unknown formatter \"{key}\".");

        IValueFormatter fmt;
        var fullKey = $"{info.Name}.{fmtInfo.Name}";

        if (!cache.TryGetValue(fullKey, out fmt!))
        {
            if (!formatters.TryGetValue(fmtInfo.Type, out var fmtType))
                throw new SourcebookException($"Unknown formatter type \"{fmtInfo.Type}\".");

            try
            {
                fmt = (IValueFormatter)Activator.CreateInstance(fmtType)!;
            }
            catch (Exception ex)
            {
                throw new SourcebookException($"Unable to initialize formatter of type \"{fmtInfo.Type}\"", ex);
            }

            fmt.Initialize(fmtInfo.Options);
            cache[fullKey] = fmt;
        }

        return fmt;
    }

    void IValueFormatter.Initialize(List<OptionEntry>? options) { }

    string IValueFormatter.Format(object value, string? format)
    {
        string? toString()
        {
            if (format is null)
                return value?.ToString();

            var fmt = "{0:" + format + "}";
            return string.Format(fmt, value);
        }

        return toString() ?? "";
    }
}