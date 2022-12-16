using Ogress.Sourcebook.Configuration;
using System.Text;

namespace Ogress.Sourcebook.Data;

internal sealed class AliasMap
{
    private readonly Dictionary<string, (string Alias, string Key, string Name)> tableAliases;
    private readonly Dictionary<string, string> fieldAliases;

    public ExternalSourceInfo Info { get; }

    public AliasMap(ExternalSourceInfo info)
    {
        Info = info;
        tableAliases = BuildTableAliasMap();
        fieldAliases = BuildFieldAliasMap(tableAliases);
    }

    public (string Alias, string Key, string Name) GetTable(string name)
    {
        if (!tableAliases.TryGetValue(name, out var al))
            throw new SourcebookException($"Invalid table name \"{name}\".");

        return al;
    }

    public bool TryGetField(string alias, out string fullName) => fieldAliases.TryGetValue(alias, out fullName!);

    private string MakeAlias(int i) => "t" + i;

    private string EscapeTableName(string name)
    {
        var arr = name.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var sb = new StringBuilder();

        for (var i = 0; i < arr.Length; i++)
        {
            if (i > 0)
                sb.Append('.');
            sb.Append("\"" + arr[i] + "\"");
        }

        return sb.ToString();
    }

    private Dictionary<string, (string Alias, string Key, string Name)> BuildTableAliasMap()
    {
        Dictionary<string, (string Alias, string Key, string Name)> dict = new();

        for (var i = 0; i < Info.Tables.Count; i++)
        {
            var tab = Info.Tables[i];

            if (tab.Name is null)
                throw new SourcebookException($"Attribute \"name\" is required for table #{i}.");

            if (tab.Key is null && Info.Tables.Count > 1)
                throw new SourcebookException($"Attributes \"key\" is required for table \"{tab.Name}\".");

            var alias = MakeAlias(i);
            var escaped = EscapeTableName(tab.Name);

            if (dict.ContainsKey(tab.Name))
                throw new SourcebookException($"Duplicate table name {escaped}.");

            var tup = (alias, tab.Key ?? "", escaped);
            dict.Add(tab.Name, tup);
            dict.Add(escaped, tup);

            if (tab.Alias is not null)
            {
                if (dict.ContainsKey(tab.Alias))
                    throw new SourcebookException($"Duplicate table alias \"{tab.Alias}\".");

                dict.Add(tab.Alias, tup);
            }
        }

        return dict;
    }

    private Dictionary<string, string> BuildFieldAliasMap(Dictionary<string, (string Alias, string Key, string Name)> tableAliases)
    {
        Dictionary<string, string> dict = new();

        for (var i = 0; i < Info.Fields.Count; i++)
        {
            var fi = Info.Fields[i];
            var arr = fi.Name.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            if (arr.Length == 0)
                throw new SourcebookException($"Invalid name for a field \"{fi.Name}\", name should include table name or alias.");

            var field = arr[arr.Length - 1];
            var tab = string.Join('.', arr.Take(arr.Length - 1));

            if (!tableAliases.TryGetValue(tab, out var aliasInfo))
                throw new SourcebookException($"Invalid table name or alias \"{tab}\".");

            var fullField = $"\"{aliasInfo.Alias}\".\"{field}\"";

            if (fi.Alias is null)
            {
                fi = fi with { Alias = field };
                Info.Fields[i] = fi;
            }

            if (dict.ContainsKey(fi.Alias))
                throw new SourcebookException($"Field alias \"{fi.Alias}\" is duplicate.");

            dict.Add(fi.Alias, fullField);
        }

        return dict;
    }
}
