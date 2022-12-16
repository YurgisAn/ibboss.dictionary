using System.Text.Json;
using System.Text.Json.Serialization;

namespace Ogress.Sourcebook.Configuration;

public sealed class EnumConverter<T> : JsonConverter<T> where T : struct
{
    public override T Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.String ||
            !Enum.TryParse<T>(reader.GetString(), true, out var res))
            throw new SourcebookException("Invalid property value.");

        return res;
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options) =>
        writer.WriteStringValue(value.ToString());
}
