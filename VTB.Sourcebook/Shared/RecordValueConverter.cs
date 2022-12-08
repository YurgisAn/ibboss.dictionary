using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace VTB.Sourcebook;

public sealed class RecordValueConverter : JsonConverter<RecordValue>
{
    public override RecordValue? Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
    {
        if (!JsonDocument.TryParseValue(ref reader, out var doc))
            throw new SourcebookException($"Invalid input data!");

        return ReadObject(doc.RootElement);
    }

    private RecordValue ReadObject(JsonElement elem)
    {
        var typeInfo = elem.GetProperty("$type").GetString();
        var rawValue = elem.GetProperty("value").GetString();
        object value = DBNull.Value;

        if (rawValue is not null)
        {
            if (typeInfo is null)
                throw new SourcebookException($"Type is not specified for {nameof(RecordValue)}.");

            value = typeInfo switch
            {
                "int" => int.Parse(rawValue),
                "string" => rawValue,
                "date" => DateTime.ParseExact(rawValue, "yyyy-MM-dd", CultureInfo.InvariantCulture.DateTimeFormat),
                "null" => DBNull.Value,
                _ => throw new SourcebookException($"Type \"{typeInfo}\" is not supported."),
            };
        }

        return new RecordValue(elem.GetProperty("formattedValue").GetString() ?? "", value);
    }

    public override void Write(Utf8JsonWriter writer, RecordValue value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        var (type, val) = GetValue(value.Value);
        writer.WriteString("$type", type);
        writer.WriteString("value", val);
        writer.WriteString("formattedValue", value.FormattedValue ?? "");
        writer.WriteEndObject();
    }

    private (string, string) GetValue(object value)
    {
        if (value is null || value is DBNull)
            return ("null", "$DBNull");
        else if (value is int i)
            return ("int", i.ToString(CultureInfo.InvariantCulture.NumberFormat));
        else if (value is bool b)
            return ("int", b ? "1" : "0");
        else if (value is string s)
            return ("string", s);
        else if (value is DateTime dt)
            return ("date", dt.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture.DateTimeFormat));
        else
            throw new SourcebookException($"Type \"{value.GetType().Name}\" is not supported.");
    }
}