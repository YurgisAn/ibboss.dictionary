using System.Text.Json.Serialization;

namespace Ogress.Sourcebook.Configuration;

public record class BookEntry(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("page")] string Page,
    [property: JsonPropertyName("disabled")] bool Disabled);

public record class BookInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("columns")] List<ColumnInfo> Columns,
    [property: JsonPropertyName("lists")] List<ListInfo> Lists,
    [property: JsonPropertyName("filters")] List<FilterInfo> Filters,
    bool Distinct,
    int? Take,
    int? Skip,
    string? SortBy,
    bool? SortAscending,
    List<FieldInfo> Fields,
    List<TableInfo> Tables,
    string? Condition) : ExternalSourceInfo(Fields, Tables, Distinct, Take, Skip, SortBy, SortAscending, Condition);

public record class TableInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("alias")] string? Alias,
    [property: JsonPropertyName("key")] string Key,
    [property: JsonPropertyName("relation")] string? Relation);

public record class ColumnInfo(
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("value")] string Value,
    [property: JsonPropertyName("sortBy")] string? SortBy,
    [property: JsonPropertyName("filter")] string? Filter,
    [property: JsonPropertyName("hints")][property: JsonConverter(typeof(EnumConverter<Hints>))] Hints? Hints);

public record class ElementInfo(
    [property: JsonPropertyName("text")] string Text,
    [property: JsonPropertyName("value")] string Value);

public record class ExternalSourceInfo(
    [property: JsonPropertyName("fields")] List<FieldInfo> Fields,
    [property: JsonPropertyName("tables")] List<TableInfo> Tables,
    [property: JsonPropertyName("distinct")] bool Distinct,
    [property: JsonPropertyName("take")] int? Take,
    [property: JsonPropertyName("skip")] int? Skip,
    [property: JsonPropertyName("sortBy")] string? SortBy,
    [property: JsonPropertyName("sortAsc")] bool? SortAscending,
    [property: JsonPropertyName("condition")] string? Condition);

public record class FieldInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("alias")] string Alias);

public record class FilterInfo(
    [property: JsonPropertyName("field")] string Field,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("editor")][property: JsonConverter(typeof(EnumConverter<FieldEditor>))] FieldEditor? Editor,
    [property: JsonPropertyName("list")] string? List,
    [property: JsonPropertyName("hints")][property: JsonConverter(typeof(EnumConverter<FilterHints>))] FilterHints? Hints);

public record class ListInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("valueType")][property: JsonConverter(typeof(EnumConverter<ListValueType>))] ListValueType ValueType,
    [property: JsonPropertyName("values")] List<ElementInfo>? Values,
    [property: JsonPropertyName("source")] ExternalSourceInfo? Source);

public record class ListEntry(
    [property: JsonPropertyName("caption")] string Caption,
    [property: JsonPropertyName("value")] string Value
    );