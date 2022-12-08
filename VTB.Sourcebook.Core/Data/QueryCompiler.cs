using System.Text;
using VTB.Sourcebook.Configuration;
using VTB.Sourcebook.Parsing;
using VTB.Sourcebook.QueryModel;

namespace VTB.Sourcebook.Data;

public sealed class QueryCompiler
{
    public ExternalSourceInfo Info { get; }

    private readonly Dictionary<string, (string Alias, string Key, string Name)> tableAliases;
    private readonly Dictionary<string, string> fieldAliases;
    private readonly Dictionary<string, LiteralNode> parameters = new();
    private string? baseSql;

    public QueryCompiler(ExternalSourceInfo info)
    {
        Info = info;
        tableAliases = BuildTableAliasMap();
        fieldAliases = BuildFieldAliasMap(tableAliases);
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

    private string MakeAlias(int i) => "t" + i;

    private (string Alias, string Key, string Name) GetTable(string name)
    {
        if (!tableAliases.TryGetValue(name, out var al))
            throw new SourcebookException($"Invalid table name \"{name}\".");

        return al;
    }

    public string GenerateStatement(QueryNode? filter)
    {
        baseSql ??= GenerateFromClause(filter);
        var sb = new StringBuilder();
        sb.Append("select");

        if (Info.Distinct)
            sb.Append(" distinct");

        sb.AppendLine();

        for (var i = 0; i < Info.Fields.Count; i++)
        {
            var fi = Info.Fields[i];
            var fullField = fieldAliases[fi.Alias!];

            sb.Append('\t');
            sb.Append(fullField);
            sb.Append(" as ");
            sb.Append("\"" + fi.Alias + "\"");
            sb.AppendLine(i < Info.Fields.Count - 1 ? "," : "");
        }

        sb.Append(baseSql);

        if (!string.IsNullOrWhiteSpace(Info.SortBy) && Info.SortBy != "null")
        {
            if (!fieldAliases.TryGetValue(Info.SortBy, out var sortField))
                throw new SourcebookException($"Invalid sort column \"{Info.SortBy}\". Column for sorting should define an alias.");

            sb.Append($"order by {sortField}");

            if (Info.SortAscending is not null && Info.SortAscending.Value)
                sb.Append(" asc");
            else if (Info.SortAscending is not null && !Info.SortAscending.Value)
                sb.Append(" desc");

            sb.AppendLine();
        }

        if (Info.Take is not null && Info.Skip is not null)
            sb.AppendLine($"limit {Info.Take} offset {Info.Skip}");
        else if (Info.Take is not null)
            sb.AppendLine($"limit {Info.Take}");

        return sb.ToString();
    }

    public string GenerateCountSql(QueryNode? filter)
    {
        baseSql ??= GenerateFromClause(filter);
        return "select " + (Info.Distinct ? "distinct" : "") + " count(*) " + baseSql;
    }

    public IDictionary<string, LiteralNode> GetParameters() => parameters;

    private string GenerateFromClause(QueryNode? filter)
    {
        var sb = new StringBuilder();

        if (Info.Tables.Count == 0)
            throw new SourcebookException("Table definition(s) not found for dictionary.");

        for (var i = 0; i < Info.Tables.Count; i++)
        {
            var tab = Info.Tables[i];
            var (alias, key, name) = tableAliases[tab.Name];

            if (i == 0)
            {
                if (tab.Relation is not null)
                    throw new SourcebookException("Attribute \"relation\" is not allowed on a primary table.");

                sb.AppendLine($"from {name} as \"{alias}\"");
            }
            else
            {
                if (tab.Relation is null)
                    throw new SourcebookException($"Attribute \"relation\" is required for table {name}.");

                var rel = GetTable(tab.Relation);
                sb.AppendLine($"inner join {name} as \"{alias}\" on \"{alias}\".\"{key}\" = \"{rel.Alias}\".\"{rel.Key}\"");
            }
        }

        GenerateWhereClause(sb, filter);
        return sb.ToString();
    }

    private void GenerateWhereClause(StringBuilder sb, QueryNode? node)
    {
        var (hasCondition, hasQuery) = (!string.IsNullOrWhiteSpace(Info.Condition),
            node is not null && node is not EmptyNode);

        if (hasCondition || hasQuery)
            sb.Append("where ");

        if (hasCondition)
        {
            var p = new Parser(new Scanner(new StringBuffer(Info.Condition!)));
            p.Parse();
            GenerateWhereExpression(sb, p.Expression);

            if (hasQuery)
                sb.Append(" and ");
        }

        if (hasQuery)
            GenerateWhereExpression(sb, node);

        if (hasCondition || hasQuery)
            sb.AppendLine();
    }

    private void GenerateWhereExpression(StringBuilder sb, QueryNode? node)
    {
        if (node is null)
            return;

        if (node is NotNode not)
        {
            sb.Append(" not ");
            GenerateWhereExpression(sb, not.Node);
        }
        else if (node is AndNode and)
        {
            sb.Append('(');
            GenerateWhereExpression(sb, and.Left);
            sb.Append(" and ");
            GenerateWhereExpression(sb, and.Right);
            sb.Append(')');
        }
        else if (node is OrNode or)
        {
            sb.Append('(');
            GenerateWhereExpression(sb, or.Left);
            sb.Append(" or ");
            GenerateWhereExpression(sb, or.Right);
            sb.Append(')');
        }
        else if (node is BinaryNode bin)
        {
            GenerateWhereExpression(sb, bin.Left);
            sb.Append(' ');
            
            if (bin.Right is LiteralNode lit && lit.Type == LiteralType.Null)
            {
                if (bin.Operator == BinaryOperator.Equals)
                    sb.Append("is null");
                else if (bin.Operator == BinaryOperator.NotEquals)
                    sb.Append("is not null");
            }
            else
            {
                var op = bin.Operator switch
                {
                    BinaryOperator.Like => "like",
                    BinaryOperator.Equals => "=",
                    BinaryOperator.NotEquals => "<>",
                    BinaryOperator.Greater => ">",
                    BinaryOperator.GreaterOrEquals => ">=",
                    BinaryOperator.Lesser => "<",
                    BinaryOperator.LesserOrEquals => "<=",
                    _ => throw new SourcebookException("Invalid binary operator.")
                };
                sb.Append(op);
                sb.Append(' ');
                GenerateWhereExpression(sb, bin.Right);
            }
        }
        else if (node is BetweenNode btw)
        {
            GenerateWhereExpression(sb, btw.Node);
            sb.Append(" between ");
            GenerateWhereExpression(sb, btw.LowerBound);
            sb.Append(" and ");
            GenerateWhereExpression(sb, btw.UpperBound);
        }
        else if (node is LiteralNode lit)
        {
            var pnam = "p" + (parameters.Count + 1);
            parameters.Add(pnam, lit);
            sb.Append('@');
            sb.Append(pnam);
        }
        else if (node is NameNode nam)
        {
            if (!fieldAliases.TryGetValue(nam.Name, out var value))
                throw new SourcebookException($"Unknown field alias \"{nam.Name}\".");
            sb.Append(value);
        }
        else
            throw new SourcebookException($"Unknown type of a query node: \"{node.GetType().Name}\".");
    }
}
