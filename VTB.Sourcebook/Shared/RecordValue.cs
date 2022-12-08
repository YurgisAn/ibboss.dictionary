using System.Text.Json.Serialization;
using VTB.Sourcebook.Configuration;

namespace VTB.Sourcebook;

[JsonConverter(typeof(RecordValueConverter))]
public record class RecordValue(
    string FormattedValue,
    object Value);
