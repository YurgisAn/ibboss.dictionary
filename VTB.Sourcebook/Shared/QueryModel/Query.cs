namespace VTB.Sourcebook.QueryModel;

public static class Query
{
    private static readonly QueryNode emptyNode = new EmptyNode();
    
    public static QueryNode Literal(object value)
    {
        if (value is LiteralNode lit)
            return lit;
        else if (value is string)
            return new LiteralNode(LiteralType.String, value);
        else if (value is int)
            return new LiteralNode(LiteralType.Number, value);
        else if (value is DateTime)
            return new LiteralNode(LiteralType.Date, value);
        else if (value is bool b)
            return new LiteralNode(LiteralType.Number, b ? 1 : 0);
        else
            throw new SourcebookException($"Invalid literal type: \"{value.GetType().Name}\".");
    }

    public static QueryNode Name(string name) => new NameNode(name);

    public static QueryNode Not(QueryNode node) => new NotNode(node);

    public static QueryNode Equals(string left, object right) =>
        Binary(BinaryOperator.Equals, Name(left), Literal(right));

    public static QueryNode NotEquals(string left, object right) =>
        Binary(BinaryOperator.NotEquals, Name(left), Literal(right));

    public static QueryNode Lesser(string left, object right) =>
        Binary(BinaryOperator.Lesser, Name(left), Literal(right));

    public static QueryNode Greater(string left, object right) =>
        Binary(BinaryOperator.Greater, Name(left), Literal(right));

    public static QueryNode LesserOrEquals(string left, object right) =>
        Binary(BinaryOperator.LesserOrEquals, Name(left), Literal(right));

    public static QueryNode GreaterOrEquals(string left, object right) =>
        Binary(BinaryOperator.GreaterOrEquals, Name(left), Literal(right));

    public static QueryNode Like(string left, string right) =>
        Binary(BinaryOperator.Like, Name(left), Literal(right));

    public static QueryNode Like(string left, LiteralNode right) =>
        Binary(BinaryOperator.Like, Name(left), right);

    public static QueryNode Binary(BinaryOperator op, QueryNode left, QueryNode right)
    {
        if (left is null || right is null)
            throw new SourcebookException("Invalid node value.");

        return new BinaryNode(op, left, right);
    }

    public static QueryNode Between(string field, DateTime lowerBound, DateTime upperBound) =>
        Between(Name(field), Literal(lowerBound), Literal(upperBound));

    public static QueryNode Between(QueryNode node, QueryNode lowerBound, QueryNode upperBound)
    {
        if (node is null || upperBound is null || lowerBound is null)
            throw new SourcebookException("Invalid node value.");

        return new BetweenNode(node, lowerBound, upperBound);
    }

    public static QueryNode And(QueryNode left, QueryNode right)
    {
        if (left is null || right is null)
            throw new SourcebookException("Invalid node value.");

        return new AndNode(left, right);
    }

    public static QueryNode And(params QueryNode[] nodes)
    {
        if (nodes?.Length < 2)
            throw new SourcebookException("Invalid node value.");

        QueryNode? prev = null;

        foreach (var n in nodes!)
        {
            if (prev is null)
                prev = n;
            else if (prev is AndNode a)
                prev = new AndNode(a, n);
            else
                prev = new AndNode(prev, n);
        }

        return prev!;
    }

    public static QueryNode Or(QueryNode left, QueryNode right)
    {
        if (left is null || right is null)
            throw new SourcebookException("Invalid node value.");

        return new OrNode(left, right);
    }

    public static QueryNode Or(params QueryNode[] nodes)
    {
        if (nodes?.Length < 2)
            throw new SourcebookException("Invalid node value.");

        QueryNode? prev = null;

        foreach (var n in nodes!)
        {
            if (prev is null)
                prev = n;
            else if (prev is OrNode a)
                prev = new OrNode(a, n);
            else
                prev = new OrNode(prev, n);
        }

        return prev!;
    }

    public static QueryNode Empty() => emptyNode;
}
