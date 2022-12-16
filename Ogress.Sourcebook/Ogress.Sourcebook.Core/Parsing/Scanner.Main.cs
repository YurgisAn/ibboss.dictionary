namespace Ogress.Sourcebook.Parsing;

partial class Scanner
{
    private const char EOL = '\n';
    private const int eofSym = 0; /* pdt */

    internal readonly SourceBuffer buffer; // scanner buffer

    private Token t = null!;          // current token
    private int ch;           // current input character
    private int pos;          // byte position of current character
    private int charPos;      // position by unicode characters starting with 0
    private int col;          // column number of current character
    private int line;         // line number of current character
    private int oldEols;      // EOLs that appeared in a comment;
    private static readonly Map start; // maps first token character to start state
    private Token tokens = null!;     // list of tokens already peeked (first token is a dummy)
    private Token pt = null!;         // current peek token
    private char[] tval = new char[128]; // text of current token
    private int tlen;         // length of current token

    public Scanner(SourceBuffer buffer)
    {
        this.buffer = buffer;
        Init();
    }

    private void Init()
    {
        pos = -1; line = 1; col = 0; charPos = -1;
        oldEols = 0;
        NextCh();
        pt = tokens = new Token();
    }

    private void NextCh()
    {
        if (oldEols > 0)
        {
            ch = EOL;
            oldEols--;
        }
        else
        {
            pos = buffer.Pos;
            ch = buffer.Read();
            col++;
            charPos++;

            if (ch == '\r' && buffer.Peek() != '\n')
                ch = EOL;

            if (ch == EOL)
            {
                line++;
                col = 0;
            }
        }
        //Place for casing1, not needed currently
    }

    private void SetScannerBehindT()
    {
        buffer.Pos = t.pos;
        NextCh();
        line = t.line; col = t.col; charPos = t.charPos;

        for (var i = 0; i < tlen; i++)
            NextCh();
    }

    internal Token Scan()
    {
        if (tokens.next == null)
            return NextToken();
        else
        {
            pt = tokens = tokens.next;
            return tokens;
        }
    }

    public Token Peek()
    {
        do
        {
            if (pt.next == null)
                pt.next = NextToken();

            pt = pt.next;
        }
        while (pt.kind > maxT);

        return pt;
    }

    public void ResetPeek()
    {
        pt = tokens;
    }
}
