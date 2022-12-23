//Примеры использования:
//Query.Equals("bic", "1224")
//Query.And(Query.Equals("bic", "1224"), Query.Like("field", "A%"))
//Query.And( [Query.Equals("bic", "1224"), Query.Like("field", "A%"), Query.Greater("ff", 12, "Number")] )
class Query
{
    static AndOr(type, arr) {
        if (arr.length == 1 && Array.isArray(arr[0]))
            arr = arr[0];
        
        var prev = null;
            
        for (var i = 0; i < arr.length; i++) {
            if (prev == null)
                prev = arr[i];
            else if (prev["$type"] == type)
                prev = {
                    "$type": type,
                    "left": prev,
                    "right": arr[i]
                };
            else
                prev = {
                    "$type": type,
                    "left": prev,
                    "right": arr[i]
                };
        }

        return prev;
    }

    static And() {
        return Query.AndOr("AndNode", arguments)
    }

    static Or(left, right) {
        return Query.AndOr("OrNode", arguments)
    }

    static Not(node) {
        return {
            "$type": "NotNode",
            "node": node
        }
    }

    static Name(name) {
        return {
            "$type": "NameNode",
            "name": name
        }
    }

    static Literal(value, type) {
        return {
            "$type": "LiteralNode",                        
            "type": type,
            "value": value,
        }
    }

    static BinaryNode(name, op, value, type) {
        return {
            "$type": "BinaryNode",
            "operator": op,
            "left": Query.Name(name),
            "right": Query.Literal(value, type ?? "String")
        }
    }

    static Equals(name, value, type) {
        return Query.BinaryNode(name, "Equals", value, type);
    }

    static Like(name, value, type) {                    
        return Query.BinaryNode(name, "Like", value, type);
    }

    static NotEquals(name, value, type) {
        return Query.BinaryNode(name, "NotEquals", value, type);
    }

    static Lesser(name, value, type) {
        return Query.BinaryNode(name, "Lesser", value, type);
    }

    static Greater(name, value, type) {
        return Query.BinaryNode(name, "Greater", value, type);
    }

    static LesserOrEquals(name, value, type) {
        return Query.BinaryNode(name, "LesserOrGreater", value, type);
    }

    static GreaterOrEquals(name, value, type) {
        return Query.BinaryNode(name, "GreaterOrGreater", value, type);
    }

    static Between(name, lowerBound, upperBound, type) {
        return {
            "$type": "BetweenNode",
            "node": Query.Name(name),
            "lower": Query.Literal(lowerBound, "Date"),
            "upper": Query.Literal(upperBound, "Date")
        }
    }

    static Empty() {
        return {
            "$type": "EmptyNode"
        }
    }
}