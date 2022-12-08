using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace VTB.Sourcebook.Configuration;

public class ObjectConverter : JsonConverter<object>
{
    public override object Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options) =>
        reader.TokenType switch
        {
            JsonTokenType.String => reader.GetString() ?? "",
            JsonTokenType.Number => ReadNumber(reader),
            JsonTokenType.True => true,
            JsonTokenType.False => false,
            _ => throw new SourcebookException($"Invalid property value.")
        };

    public override void Write(Utf8JsonWriter writer, object value, JsonSerializerOptions options)
    {
        var str = ConvertToString(value);
        writer.WriteStringValue(str);
    }

    public static string ConvertToString(object value)
    {
        if (value is double d)
            return d.ToString(CultureInfo.InvariantCulture);
        else if (value is decimal m)
            return m.ToString(CultureInfo.InvariantCulture);
        else if (value is int i)
            return i.ToString(CultureInfo.InvariantCulture);
        else if (value is string s)
            return s.ToString();
        else if (value is bool b)
            return b ? "true" : "false";
        else if (value is DBNull)
            return "null";
        else if (value is DateTime dt)
            return dt.ToString(CultureInfo.InvariantCulture);
        else
            throw new SourcebookException($"Invalid type \"{value?.GetType().Name}\" for a property value.");
    }

    private object ReadNumber(Utf8JsonReader reader)
    {
        var num = reader.GetDecimal();
        return num % 1 == 0 ? (int)num : num;
    }
}
