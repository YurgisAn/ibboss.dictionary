namespace VTB.Sourcebook.Parsing;

public sealed class StringBuffer : SourceBuffer
{
    private readonly char[] buffer;
    private int bufferPosition;
    private int bufferLen;

    public StringBuffer(string value)
    {
        this.buffer = value.ToCharArray();
        this.bufferLen = this.buffer.Length;
    }

    protected internal override int Read()
    {
        if (this.bufferPosition < this.bufferLen)
            return this.buffer[this.bufferPosition++];
        else
            return EOF;
    }

    protected internal override int Peek()
    {
        var curPos = Pos;
        var ch = Read();
        Pos = curPos;
        return ch;
    }

    protected internal override string GetString(int start, int end)
    {
        var len = 0;
        var buf = new char[end - start];
        var oldPos = Pos;
        Pos = start;

        while (Pos < end)
            buf[len++] = (char)Read();

        Pos = oldPos;
        return new string(buf, 0, len);
    }

    protected internal override int Pos
    {
        get { return this.bufferPosition; }
        set
        {
            if (value < 0 || value > bufferLen)
                throw new IndexOutOfRangeException();

            this.bufferPosition = value;
        }
    }
}
