namespace Ogress.Sourcebook.Format;

public interface IValueFormatter
{
    string Format(object value, string? format);
}
