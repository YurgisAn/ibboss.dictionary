using System.Text.Json.Serialization;

namespace Ogress.Sourcebook.QueryModel;

[JsonConverter(typeof(QueryNodeConverter))]
public abstract record class QueryNode;

public record class EmptyNode() : QueryNode;

public record class AndNode(QueryNode Left, QueryNode Right) : QueryNode;

public record class OrNode(QueryNode Left, QueryNode Right) : QueryNode;

public record class BetweenNode(QueryNode Node, QueryNode LowerBound, QueryNode UpperBound) : QueryNode;

public record class BinaryNode(BinaryOperator Operator, QueryNode Left, QueryNode Right) : QueryNode;

public record class LiteralNode(LiteralType Type, object Value) : QueryNode;

public record class NameNode(string Name) : QueryNode;

public record class NotNode(QueryNode Node) : QueryNode;