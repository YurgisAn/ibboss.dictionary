/**
 * Динамические запросы
*/
import { QueryRequest } from '~/shared/models/query-request'; 
/**
 * Функция сложение/вычетание база
 * @param type Тип
 * @param arr Массив
 * @returns 
 */

export function andOr(type: string, arr: Array<any>):QueryRequest{
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
};

export function and(arr: Array<any>):QueryRequest{
    return andOr("AndNode", arr)
};

export function qName(name:string):QueryRequest {
    return {
        "$type": "NameNode",
        "name": name
    }
};

export function literal(value:string, type:string):QueryRequest {
    return {
        "$type": "LiteralNode",                        
        "type": type,
        "value": value,
    }
}

export function binaryNode(name:string, operator:string, value:any, type:string | null) :QueryRequest{
    return {
        "$type": "BinaryNode",
        "operator": operator,
        "left": qName(name),
        "right": literal(value, type ?? "String")
    }
};

export function equals(name: string, value: string, type: string) :QueryRequest{
    return binaryNode(name, "Equals", value, type);
}

export function like(name: string, value: string, type: string):QueryRequest {
    return binaryNode(name, "Like", value, type);
}
