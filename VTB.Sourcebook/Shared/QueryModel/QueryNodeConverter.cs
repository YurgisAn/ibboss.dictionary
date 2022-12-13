using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using VTB.Sourcebook.Configuration;

namespace VTB.Sourcebook.QueryModel;

public sealed class QueryNodeConverter : JsonConverter<QueryNode>
{
    public override QueryNode? Read(ref Utf8JsonReader reader, Type type, JsonSerializerOptions options)
    {
        if (!JsonDocument.TryParseValue(ref reader, out var doc))
            throw new SourcebookException($"Invalid input data!");

        return ReadObject(doc.RootElement);
    }

    private QueryNode ReadObject(JsonElement elem)
    {
        var type = elem.GetProperty("$type");

        switch (type.GetString())
        {
            case "NameNode":
                return new NameNode(elem.GetProperty("name").GetString()!);
            case "LiteralNode":
                var lt = Enum.Parse<LiteralType>(elem.GetProperty("type")!.GetString()!);
                return new LiteralNode(lt,
                    ReadAsObject(lt, elem.GetProperty("value")));
            case "NotNode":
                return new NotNode(ReadObject(elem.GetProperty("node")));
            case "AndNode":
                return new AndNode(
                    ReadObject(elem.GetProperty("left")),
                    ReadObject(elem.GetProperty("right")));
            case "OrNode":
                return new OrNode(
                    ReadObject(elem.GetProperty("left")),
                    ReadObject(elem.GetProperty("right")));
            case "BinaryNode":
                var op = Enum.Parse<BinaryOperator>(elem.GetProperty("operator")!.GetString()!);
                return new BinaryNode(
                    op,
                    ReadObject(elem.GetProperty("left")),
                    ReadObject(elem.GetProperty("right")));
            case "BetweenNode":
                return new BetweenNode(
                    ReadObject(elem.GetProperty("node")),
                    ReadObject(elem.GetProperty("lower")),
                    ReadObject(elem.GetProperty("upper")));
            case "EmptyNode":
                return Query.Empty();
            default:
                throw new SourcebookException($"Invalid element type \"{type.GetString()}\".");
        }
    }

    private object ReadAsObject(LiteralType type, JsonElement elem)
    {
        var str = elem.GetString()!;
        switch (type)
        {
            case LiteralType.String:
                return str;
            case LiteralType.Number:
                var d = decimal.Parse(str);
                return d % 1 == 0 ? (int)d : d;
            case LiteralType.Date:
                return DateTime.ParseExact(str,"MM/dd/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            default:
                throw new SourcebookException($"Invalid literal type: {type}.");
        };
    }

    public override void Write(Utf8JsonWriter writer, QueryNode value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteString("$type", value.GetType().Name);

        if (value is NameNode n)
            writer.WriteString("name", n.Name);
        else if (value is LiteralNode t)
        {
            writer.WriteString("type", t.Type.ToString());
            writer.WriteString("value", ObjectConverter.ConvertToString(t.Value));
        }
        else if (value is NotNode nt)
        {
            writer.WritePropertyName("node");
            Write(writer, nt.Node, options);
        }
        else if (value is AndNode a)
        {
            writer.WritePropertyName("left");
            Write(writer, a.Left, options);
            writer.WritePropertyName("right");
            Write(writer, a.Right, options);
        }
        else if (value is OrNode o)
        {
            writer.WritePropertyName("left");
            Write(writer, o.Left, options);
            writer.WritePropertyName("right");
            Write(writer, o.Right, options);
        }
        else if (value is BinaryNode b)
        {
            writer.WriteString("operator", b.Operator.ToString());
            writer.WritePropertyName("left");
            Write(writer, b.Left, options);
            writer.WritePropertyName("right");
            Write(writer, b.Right, options);
        }
        else if (value is BetweenNode w)
        {
            writer.WritePropertyName("node");
            Write(writer, w.Node, options);
            writer.WritePropertyName("upper");
            Write(writer, w.UpperBound, options);
            writer.WritePropertyName("lower");
            Write(writer, w.LowerBound, options);
        }

        writer.WriteEndObject();
    }
}