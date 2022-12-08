﻿using VTB.Sourcebook.Configuration;
using VTB.Sourcebook.QueryModel;

namespace VTB.Sourcebook.Client;

public sealed class FilterValue
{
    public FilterInfo Filter { get; }

    public FilterValue(FilterInfo filter) => Filter = filter;

    #region Variant
    private string? textValue;
    public string? TextValue
    {
        get => textValue;
        set
        {
            if (this.textValue != value)
            {
                this.textValue = value;
                NotifyStateChanged();
            }
        }
    }

    private int? numberValue;
    public int? NumberValue
    {
        get => numberValue;
        set
        {
            if (this.numberValue != value)
            {
                this.numberValue = value;
                NotifyStateChanged();
            }
        }
    }
    #endregion

    public bool HasValue() =>
        Filter.Editor switch
        {
            FieldEditor.Number => numberValue is not null,
            FieldEditor.Text => !string.IsNullOrWhiteSpace(textValue),
            FieldEditor.Boolean => numberValue is not null && numberValue >= 0,
            FieldEditor.List => numberValue is not null || !string.IsNullOrWhiteSpace(textValue),
            _ => false
        };

    public LiteralNode GetLiteral()
    {
        if (Filter.Editor is FieldEditor.Boolean or FieldEditor.Number)
            return new(LiteralType.Number, numberValue!);
        else if (Filter.Editor is FieldEditor.Text)
            return new(LiteralType.String, "%" + textValue + "%");
        else if (Filter.Editor is FieldEditor.List)
            return numberValue is not null ? new(LiteralType.Number, numberValue)
                : new(LiteralType.String, textValue!);
        else
            throw new NotSupportedException();
    }

    public event Action? OnChange;
    private void NotifyStateChanged() => OnChange?.Invoke();
}