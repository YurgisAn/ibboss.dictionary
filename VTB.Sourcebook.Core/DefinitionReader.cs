using System.Text.Json;
using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook;

public static class DefinitionReader
{
    public static BookInfo Read(Func<string> fileResolver)
    {
        var fullName = fileResolver();
        var src = File.ReadAllText(fullName);
        JsonDocument jdoc;

        try
        {
            jdoc = JsonDocument.Parse(src);
        }
        catch (Exception ex) when (ex is ArgumentException or JsonException)
        {
            throw new SourcebookException($"Invalid definition for sourcebook \"{fullName}\".");
        }

        var retval = JsonSerializer.Deserialize<BookInfo>(jdoc) ??
            throw new SourcebookException($"Unable to deserialize sourcebook \"{fullName}\".");

        for (var i = 0; i < retval.Fields.Count; i++)
        {
            var fi = retval.Fields[i];

            if (fi.Alias is null)
            {
                var arr = fi.Name?.Split(new char[] { '.' }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                if (arr?.Length > 0)
                    retval.Fields[i] = fi with { Alias = arr[arr.Length - 1] };
            }
        }

        return retval;
    }
}
