using System.Text.Json;
using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.Lists;
using Ogress.Sourcebook.QueryModel;

namespace Ogress.Sourcebook.Data;

public sealed class Book
{
    private const string DirectoryFileName = "books.json";
    private const string Extension = ".book.json";

    private readonly BookInfo info;
    private readonly DataReader dbReader;
    private readonly string queryCompiler;

    private Book(BookInfo info, DataReader dbReader, string queryCompiler) => 
        (this.info, this.dbReader, this.queryCompiler) = (info, dbReader, queryCompiler);

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
        return new Book(info, dbReader, options.QueryCompiler);
    }

    public static BookEntry[] GetDirectory(InitOptions options)
    {
        var file = options.Directory.FirstOrDefault(f => f.Name == DirectoryFileName);

        if (file is null)
            throw new SourcebookException($"Unable to find directory listing \"{DirectoryFileName}\".");

        return JsonSerializer.Deserialize<BookEntry[]>(File.ReadAllText(file.FullName))
            ?? throw new SourcebookException($"Directory listing \"{DirectoryFileName}\" is empty.");
    }

    private IQueryCompiler GetCompiler(ExternalSourceInfo info, int? take = null, int? skip = null, string? sortColumn = null, bool? asc = null)
    {
        var patched = info;

        if (take is not null || skip is not null || sortColumn is not null || asc is not null)
            patched = info with { Take = take, Skip = skip, SortBy = sortColumn, SortAscending = asc };

        return QueryCompilerFactory.Obtain(queryCompiler, patched);
    }

    public BookInfo GetMetadata() => info;

    public int GetRecordCount(QueryNode? filter) => dbReader.GetRecordCount(GetCompiler(info), filter);

    public List<Item> GetRows(int take, int skip, string? sortColumn, bool asc, QueryNode? filter)
    {
        var records = dbReader.GetRecords(GetCompiler(info, take, skip, sortColumn, asc), filter);
        var xs = new List<Item>();

        foreach (var rec in records)
        {
            var list = new List<ItemValue>();
            foreach (var col in info.Columns)
            {
                var expanded = MacroProcessor.Expand(info, col, rec);
                list.Add(new ItemValue(col.Title,expanded));
            }
            xs.Add(new Item(list));
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
            var compiler = QueryCompilerFactory.Obtain(queryCompiler, xs.Source);
            var rows = dbReader.GetRecords(compiler, null);
            return rows.Select(r => new ListEntry(r["text"]?.ToString() ?? "", r["value"]?.ToString() ?? "")).ToList();
        }
        else if (xs.Provider is not null)
        {
            var prov = ListProvider.GetListProvider(info, xs.Provider);
            return prov.GetEntries().ToList();
        }

        throw new SourcebookException($"List \"{name}\" is missing external source and provider.");
    }
}