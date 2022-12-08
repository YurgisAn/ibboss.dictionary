namespace VTB.Sourcebook.Format;

public interface IValueFormatter
{
    string Format(object value, string? format);
}
