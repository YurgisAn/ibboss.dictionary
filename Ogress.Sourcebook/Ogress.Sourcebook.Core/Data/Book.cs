using System.Text.Json;
using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.QueryModel;

namespace Ogress.Sourcebook.Data;

public sealed class Book
{
    private const string DirectoryFileName = "books.json";
    private const string Extension = ".book.json";

    private readonly BookInfo info;
    private readonly DataReader dbReader;

    private Book(BookInfo info, DataReader dbReader) => 
        (this.info, this.dbReader) = (info, dbReader);

    public static Book Obtain(string name, InitOptions options)
    {
        var info = DefinitionReader.Read(
           () =>
           {
               var fullName = name + Extension;

               //Case sensitive or not? (Linux)
                var fi = options.Directory.OfType<FileInfo>()
                    .FirstOrDefault(f => f.Name == fullName);

                if (fi is null)
                    throw new SourcebookException($"Unable to find definition for the sourcebook \"{name}\".");

                return fi.FullName;
           });
        var dbReader = new DataReader(options.ConnectionString);
        return new Book(info, dbReader);
    }

    public static BookEntry[] GetDirectory(InitOptions options)
    {
        var file = options.Directory.FirstOrDefault(f => f.Name == DirectoryFileName);

        if (file is null)
            throw new SourcebookException($"Unable to find directory listing \"{DirectoryFileName}\".");

        return JsonSerializer.Deserialize<BookEntry[]>(File.ReadAllText(file.FullName))
            ?? throw new SourcebookException($"Directory listing \"{DirectoryFileName}\" is empty.");
    }

    private QueryCompiler GetCompiler(ExternalSourceInfo info, int? take = null, int? skip = null, string? sortColumn = null, bool? asc = null)
    {
        var patched = info;

        if (take is not null || skip is not null || sortColumn is not null || asc is not null)
            patched = info with { Take = take, Skip = skip, SortBy = sortColumn, SortAscending = asc };

        return new QueryCompiler(patched);
    }

    public BookInfo GetMetadata() => info;

    public int GetRecordCount(QueryNode? filter) => dbReader.GetRecordCount(GetCompiler(info), filter);

    public List<Dictionary<string, string>> GetRows(int take, int skip, string? sortColumn, bool asc, QueryNode? filter)
    {
        var records = dbReader.GetRecords(GetCompiler(info, take, skip, sortColumn, asc), filter);
        var xs = new List<Dictionary<string, string>>();

        foreach (var rec in records)
        {
            var dict = new Dictionary<string, string>();

            foreach (var col in info.Columns)
            {
                var expanded = MacroProcessor.Expand(col.Value, rec);
                dict.Add(col.Title, expanded);
            }

            xs.Add(dict);
        }

        return xs;
    }

    public List<ListEntry> GetList(string name)
    {
        var xs = info.Lists.FirstOrDefault(x => string.Equals(x.Name, name, StringComparison.OrdinalIgnoreCase));

        if (xs is null)
            throw new SourcebookException($"Unknown list \"{name}\".");

        if (xs.Source is not null)
        {
            FieldInfo findField(string fieldName)
            {
                var ret = xs!.Source!.Fields.FirstOrDefault(f => string.Equals(f.Alias, fieldName, StringComparison.OrdinalIgnoreCase));

                if (ret is null)
                    throw new SourcebookException($"List \"{name}\" doesn't have a field with a \"{fieldName}\" alias.");

                return ret;
            }

            var textField = findField("text");
            var valueField = findField("value");
            var compiler = new QueryCompiler(xs.Source);
            var rows = dbReader.GetRecords(compiler, null);
            return rows.Select(r => new ListEntry(r["text"]?.ToString() ?? "", r["value"]?.ToString() ?? "")).ToList();
        }

        if (xs.Values is null)
            throw new SourcebookException($"List \"{name}\" is missing both external source and values definition.");

        return xs.Values.Select(v => new ListEntry(v.Text, v.Value)).ToList();
    }
}