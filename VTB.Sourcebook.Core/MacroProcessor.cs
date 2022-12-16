using System.Data.Common;
using System.Text.RegularExpressions;
using Ogress.Sourcebook.Format;

namespace Ogress.Sourcebook;

internal class MacroProcessor
{
    private const string Pattern = @"{.*?}";
    private const string FormatterKey = "default";

    public static string Expand(string template, Dictionary<string, object> fields) =>
        Regex.Replace(template, Pattern, match =>
        {
            var raw = match.Value.Trim(new char[] { '{', '}' });
            var arr = raw.Split(':');

            if (arr.Length == 0)
                throw new SourcebookException($"Invalid markup inside of template: \"{template}\"");

            var field = arr[0];
            var data = fields[field];

            if (arr.Length > 1)
            {
                var key = FormatterKey;

                if (arr.Length == 3)
                    key = arr[2];

                if (!ValueFormatter.Formatters.TryGetValue(key, out var fmt))
                    throw new SourcebookException($"Unknown formatter \"{fmt}\".");

                return fmt.Format(data, string.IsNullOrWhiteSpace(arr[1]) ? (string?)null : arr[1]);
            }
            else
                return data?.ToString() ?? "";

        }, RegexOptions.Compiled);
}
