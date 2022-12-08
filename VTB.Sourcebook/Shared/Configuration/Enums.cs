using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace VTB.Sourcebook.Configuration;

public enum FieldEditor
{
    None,
    DateRange,
    Text,
    Number,
    Boolean,
    List
}

public enum ListValueType
{
    Default,
    String,
    Integer,
}

[Flags]
public enum Hints
{
    None = 0,
    AlignRight = 0x01,
    AlignCenter = 0x02,
    Hidden = 0x04
}