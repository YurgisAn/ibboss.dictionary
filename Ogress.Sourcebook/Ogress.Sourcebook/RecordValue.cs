using System.Text.Json.Serialization;

namespace Ogress.Sourcebook;

[JsonConverter(typeof(RecordValueConverter))]
public record class RecordValue(
    string FormattedValue,
    object Value);
