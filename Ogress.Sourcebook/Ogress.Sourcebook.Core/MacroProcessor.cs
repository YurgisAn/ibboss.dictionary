using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.Format;
using System.Text.RegularExpressions;

namespace Ogress.Sourcebook;

internal class MacroProcessor
{
    private const string Pattern = @"{.*?}";
    private const string FormatterKey = "default";

    public static string Expand(BookInfo info, ColumnInfo col, Dictionary<string, object> fields) =>
        Regex.Replace(col.Value, Pattern, match =>
        {
            var raw = match.Value.Trim(new char[] { '{', '}' });
            var arr = raw.Split(':');

            if (arr.Length == 0)
                throw new SourcebookException($"Invalid markup inside of template: \"{col.Value}\"");

            var field = arr[0];
            var data = fields[field];
            var formatterKey = col.Formatter ?? FormatterKey;
            var fmt = ValueFormatter.GetFormatter(info, formatterKey);

            if (arr.Length > 1)
            {
                
                if (arr.Length == 3)
                    formatterKey = arr[2];

                return fmt.Format(data, string.IsNullOrWhiteSpace(arr[1]) ? (string?)null : arr[1]);
            }
            else
            {
                return fmt.Format(data, null);
            }

        }, RegexOptions.Compiled);
}
