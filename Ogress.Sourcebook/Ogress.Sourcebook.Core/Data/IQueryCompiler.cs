using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.QueryModel;

namespace Ogress.Sourcebook.Data;

public interface IQueryCompiler
{
    ExternalSourceInfo Info { get; }

    void Initialize(ExternalSourceInfo sourceInfo);

    string GenerateStatement(QueryNode? query);

    string GenerateCountSql(QueryNode? filter);

    IDictionary<string, LiteralNode> GetParameters();
}
