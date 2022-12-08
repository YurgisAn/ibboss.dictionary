using System.Globalization;
using VTB.Sourcebook.QueryModel;

namespace VTB.Sourcebook.Parsing;

partial class Parser
{
    private const bool T = true;
    private const bool x = false;
    private const int minErrDist = 2;

    private readonly Scanner scanner;

    public Token t = null!;    // last recognized token
    public Token la = null!;   // lookahead token
    private int errDist = minErrDist;

    public QueryNode? Expression { get; private set; }

    public Parser(Scanner scanner) => this.scanner = scanner;

    private void Get()
    {
        for (; ; )
        {
            t = la;
            la = scanner.Scan();

            if (la.kind <= maxT)
            {
                ++errDist;
                break;
            }

            //Place for pragmas (not needed currently)
            la = t;
        }
    }

    private void SynErr(int n)
    {
        if (errDist >= minErrDist)
            SynErr(la.line, la.col, n);

        errDist = 0;
    }

    public void Parse()
    {
        la = new Token();
        la.val = "";
        Get();
        QL();
        Expect(0);
    }

    private void Expect(int n)
    {
        if (la.kind == n)
            Get();
        else
        {
            if (n == _semicolon
                && (t.kind == _curlyLeftToken || la.kind == 0 || la.kind == _curlyRightToken || la.AfterEol
                || la.kind == _if || la.kind == _else || la.kind == _while
                || la.kind == _continue || la.kind == _break
                ))
                return;

            SynErr(n);
        }
    }

    private bool StartOf(int s) => set[s, la.kind];

    private void ExpectWeak(int n, int follow)
    {
        if (la.kind == n)
            Get();
        else
        {
            SynErr(n);
            while (!StartOf(follow))
                Get();
        }
    }

    private bool WeakSeparator(int n, int syFol, int repFol)
    {
        var kind = la.kind;

        if (kind == n)
        {
            Get();
            return true;
        }
        else if (StartOf(repFol))
            return false;
        else
        {
            SynErr(n);

            while (!(set[syFol, kind] || set[repFol, kind] || set[0, kind]))
            {
                Get();
                kind = la.kind;
            }

            return StartOf(syFol);
        }
    }

    private object TryParseNumber()
    {
        try
        {
            var dec = decimal.Parse(t.val, NumberStyles.Integer, CultureInfo.InvariantCulture.NumberFormat);
            return dec % 1 == 0 ? (int)dec : dec;
        }
        catch
        {
            throw Error("Invalid number.", t.line, t.col);
        }
    }

    private Exception Error(string message, int line, int col) =>
        new SourcebookException($"Parsing error: {message} ({line},{col})");
}
