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
    [property: JsonPropertyName("formatters")] List<FormatterInfo> Formatters,
    [property: JsonPropertyName("listProviders")] List<ListProviderInfo> ListProviders,
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
    [property: JsonPropertyName("formatter")] string? Formatter,
    [property: JsonPropertyName("hints")][property: JsonConverter(typeof(EnumConverter<Hints>))] Hints? Hints);

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
    [property: JsonPropertyName("source")] ExternalSourceInfo? Source,
    [property: JsonPropertyName("provider")] string? Provider);

public record class ListEntry(
    [property: JsonPropertyName("caption")] string Caption,
    [property: JsonPropertyName("value")] string Value
    );

public record class FormatterInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("options")] List<OptionEntry>? Options
    );

public record class ListProviderInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("options")] List<OptionEntry>? Options
    );

public record class OptionEntry(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("value")] string Value
    );

/// <summary>
/// Список данных
/// </summary>
/// <param name="Items">Значения строки</param>
public record class Item(
    [property: JsonPropertyName("items")] List<ItemValue> Items
    );

/// <summary>
/// Значения данных
/// </summary>
/// <param name="Title">Наименование параметра</param>
/// <param name="Value">Значение параметра</param>
public record class ItemValue(
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("value")] string Value
    );