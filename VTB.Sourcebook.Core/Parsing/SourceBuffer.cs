namespace VTB.Sourcebook.Parsing;

public abstract class SourceBuffer
{
    internal const int EOF = char.MaxValue + 1;

    protected internal abstract int Pos { get; set; }

    protected internal abstract string GetString(int start, int end);

    protected internal abstract int Peek();

    protected internal abstract int Read();
}
