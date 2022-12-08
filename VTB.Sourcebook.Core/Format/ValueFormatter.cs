namespace VTB.Sourcebook.Format;

public sealed class ValueFormatter : IValueFormatter
{
    public static readonly IDictionary<string, IValueFormatter> Formatters = new Dictionary<string, IValueFormatter>(StringComparer.OrdinalIgnoreCase)
    {
        { "default", new ValueFormatter() }
    };

    private ValueFormatter() { }

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