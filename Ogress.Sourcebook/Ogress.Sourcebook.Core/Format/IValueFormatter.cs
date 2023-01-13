using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Format;

public interface IValueFormatter
{
    void Initialize(List<FormatterOption>? options);

    string Format(object value, string? format);
}
