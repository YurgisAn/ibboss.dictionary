using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.Parsing;
using Ogress.Sourcebook.QueryModel;
using System.Text;
using System.Xml.Linq;

namespace Ogress.Sourcebook.Data;

internal sealed class CompilerHelper
{
    public static void GenerateSelectClause(StringBuilder sb, AliasMap aliasMap, ExternalSourceInfo info)
    {
        for (var i = 0; i < info.Fields.Count; i++)
        {
            var fi = info.Fields[i];

            if (!aliasMap.TryGetField(fi.Alias!, out var fullField))
                throw new SourcebookException($"Invalid field \"{fi.Alias}\".");

            sb.Append('\t');
            sb.Append(fullField);
            sb.Append(" as ");
            sb.Append("\"" + fi.Alias + "\"");
            sb.AppendLine(i < info.Fields.Count - 1 ? "," : "");
        }
    }

    public static void GenerateFromClause(StringBuilder sb, AliasMap aliasMap, ExternalSourceInfo info)
    {
        if (info.Tables.Count == 0)
            throw new SourcebookException("Table definition(s) not found for dictionary.");

        for (var i = 0; i < info.Tables.Count; i++)
        {
            var tab = info.Tables[i];
            var (alias, key, name) = aliasMap.GetTable(tab.Name);

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

                var rel = aliasMap.GetTable(tab.Relation);
                sb.AppendLine($"inner join {name} as \"{alias}\" on \"{alias}\".\"{key}\" = \"{rel.Alias}\".\"{rel.Key}\"");
            }
        }
    }

    public static void GenerateOrderByClause(StringBuilder sb, AliasMap aliasMap, ExternalSourceInfo info)
    {
        if (!string.IsNullOrWhiteSpace(info.SortBy) && info.SortBy != "null")
        {
            if (!aliasMap.TryGetField(info.SortBy, out var sortField))
                throw new SourcebookException($"Invalid sort column \"{info.SortBy}\". Column for sorting should define an alias.");

            sb.Append($"order by {sortField}");

            if (info.SortAscending is not null && info.SortAscending.Value)
                sb.Append(" asc");
            else if (info.SortAscending is not null && !info.SortAscending.Value)
                sb.Append(" desc");

            sb.AppendLine();
        }
    }

    public static Dictionary<string, LiteralNode> GenerateWhereClause(StringBuilder sb, AliasMap aliasMap, ExternalSourceInfo info, QueryNode? node)
    {
        var parameters = new Dictionary<string, LiteralNode>();
        var (hasCondition, hasQuery) = (!string.IsNullOrWhiteSpace(info.Condition),
            node is not null && node is not EmptyNode);

        if (hasCondition || hasQuery)
            sb.Append("where ");

        if (hasCondition)
        {
            var p = new Parser(new Scanner(new StringBuffer(info.Condition!)));
            p.Parse();
            GenerateWhereExpression(sb, aliasMap, parameters, p.Expression);

            if (hasQuery)
                sb.Append(" and ");
        }

        if (hasQuery)
            GenerateWhereExpression(sb, aliasMap, parameters, node);

        if (hasCondition || hasQuery)
            sb.AppendLine();

        return parameters;
    }

    private static void GenerateWhereExpression(StringBuilder sb, AliasMap aliasMap, Dictionary<string, LiteralNode> parameters, QueryNode? node)
    {
        if (node is null)
            return;

        if (node is NotNode not)
        {
            sb.Append(" not ");
            GenerateWhereExpression(sb, aliasMap, parameters, not.Node);
        }
        else if (node is AndNode and)
        {
            sb.Append('(');
            GenerateWhereExpression(sb, aliasMap, parameters, and.Left);
            sb.Append(" and ");
            GenerateWhereExpression(sb, aliasMap, parameters, and.Right);
            sb.Append(')');
        }
        else if (node is OrNode or)
        {
            sb.Append('(');
            GenerateWhereExpression(sb, aliasMap, parameters, or.Left);
            sb.Append(" or ");
            GenerateWhereExpression(sb, aliasMap, parameters, or.Right);
            sb.Append(')');
        }
        else if (node is BinaryNode bin)
        {
            GenerateWhereExpression(sb, aliasMap, parameters, bin.Left);
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
                GenerateWhereExpression(sb, aliasMap, parameters, bin.Right);
            }
        }
        else if (node is BetweenNode btw)
        {
            GenerateWhereExpression(sb, aliasMap, parameters, btw.Node);
            sb.Append(" between ");
            GenerateWhereExpression(sb, aliasMap, parameters, btw.LowerBound);
            sb.Append(" and ");
            GenerateWhereExpression(sb, aliasMap, parameters, btw.UpperBound);
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
            if (!aliasMap.TryGetField(nam.Name, out var value))
                throw new SourcebookException($"Unknown field alias \"{nam.Name}\".");
            sb.Append(value);
        }
        else
            throw new SourcebookException($"Unknown type of a query node: \"{node.GetType().Name}\".");
    }
}
