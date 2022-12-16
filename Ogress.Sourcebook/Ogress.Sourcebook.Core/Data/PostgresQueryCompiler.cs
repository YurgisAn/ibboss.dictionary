using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.QueryModel;
using System.Text;

namespace Ogress.Sourcebook.Data;

public sealed class PostgresQueryCompiler
{
    public ExternalSourceInfo Info { get; private set; } = null!;

    private AliasMap aliasMap = null!;
    private Dictionary<string, LiteralNode>? parameters;
    private string? baseSql;

    public void Initialize(ExternalSourceInfo info)
    {
        Info = info;
        aliasMap = new(info);
    }
    
    public string GenerateStatement(QueryNode? filter)
    {
        GenerateBaseSql(filter);

        var sb = new StringBuilder();
        sb.Append(GetSelect());
        sb.AppendLine();
        CompilerHelper.GenerateSelectClause(sb, aliasMap, Info);
        sb.Append(baseSql);
        CompilerHelper.GenerateOrderByClause(sb, aliasMap, Info);
        GenerateLimitClause(sb);
        return sb.ToString();
    }

    public string GenerateCountSql(QueryNode? filter)
    {
        GenerateBaseSql(filter);
        return GetSelect() + " count(*) " + baseSql;
    }

    public IDictionary<string, LiteralNode> GetParameters() => parameters ?? new();

    private void GenerateLimitClause(StringBuilder sb)
    {
        if (Info.Take is not null && Info.Skip is not null)
            sb.AppendLine($"limit {Info.Take} offset {Info.Skip}");
        else if (Info.Take is not null)
            sb.AppendLine($"limit {Info.Take}");
    }

    private string GetSelect() => "select " + (Info.Distinct ? "distinct" : "");

    private void GenerateBaseSql(QueryNode? filter)
    {
        if (baseSql is null)
            (baseSql, parameters) = GenerateFromClause(filter);
    }

    private (string, Dictionary<string, LiteralNode>) GenerateFromClause(QueryNode? filter)
    {
        var sb = new StringBuilder();
        CompilerHelper.GenerateFromClause(sb, aliasMap, Info);
        var pars = CompilerHelper.GenerateWhereClause(sb, aliasMap, Info, filter);
        return (sb.ToString(), pars);
    }
}
