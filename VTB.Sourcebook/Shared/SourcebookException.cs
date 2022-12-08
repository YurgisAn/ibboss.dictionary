namespace VTB.Sourcebook;

public sealed class SourcebookException : Exception
{
    public SourcebookException(string message) : base(message) { }

    public SourcebookException(string message, Exception innerException) : base(message, innerException) { }
}
