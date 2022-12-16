
using System;
using Buffer = Ogress.Sourcebook.Parsing.SourceBuffer;


namespace Ogress.Sourcebook.Parsing;

internal sealed partial class Scanner
{
	const int maxT = 36;
	const int noSym = 36;

    static Scanner() 
    {
        start = new Map(128);
		for (int i = 65; i <= 90; ++i) start[i] = 1;
		for (int i = 97; i <= 122; ++i) start[i] = 1;
		for (int i = 48; i <= 57; ++i) start[i] = 24;
		start[95] = 25; 
		start[34] = 26; 
		start[46] = 40; 
		start[39] = 16; 
		start[40] = 17; 
		start[41] = 18; 
		start[123] = 19; 
		start[125] = 20; 
		start[44] = 21; 
		start[61] = 41; 
		start[59] = 23; 
		start[124] = 32; 
		start[38] = 34; 
		start[62] = 42; 
		start[60] = 43; 
		start[33] = 44; 
		start[Buffer.EOF] = -1;

    }

//

    private void AddCh() 
    {
        if (tlen >= tval.Length)
        {
            char[] newBuf = new char[2 * tval.Length];
            Array.Copy(tval, 0, newBuf, 0, tval.Length);
            tval = newBuf;
        }

        if (ch != Buffer.EOF)
        {
			tval[tlen++] = (char) ch;
            NextCh();
        }
    }



    private void CheckLiteral() 
    {
		switch (t.val) {
			case "else": t.kind = 12; break;
			case "if": t.kind = 13; break;
			case "while": t.kind = 14; break;
			case "continue": t.kind = 15; break;
			case "break": t.kind = 16; break;
			case "return": t.kind = 17; break;
			case "function": t.kind = 18; break;
			case "length": t.kind = 19; break;
			case "like": t.kind = 28; break;
			case "between": t.kind = 30; break;
			case "and": t.kind = 31; break;
			case "true": t.kind = 32; break;
			case "false": t.kind = 33; break;
			case "null": t.kind = 34; break;
			default: break;
		}
    }

    private Token NextToken()
    {
        bool eol = false;
        while (ch == ' ' ||
			ch >= 9 && ch <= 10 || ch == 13
        ) {
            if (ch == '\r' || ch == '\n') {
                eol = true;
            }
            NextCh();
        }

		int apx = 0;
        int recKind = noSym;
        int recEnd = pos;
        t = new Token();
        t.pos = pos; t.col = col; t.line = line; t.charPos = charPos;
        t.AfterEol = eol;
        int state;

        if (start.ContainsKey(ch))
            state = (int)start[ch];
        else
            state = 0;

        tlen = 0; 
        AddCh();

        switch (state) 
        {
            case -1: 
                t.kind = eofSym; 
                break;
            case 0:
                if (recKind != noSym) 
                {
                    tlen = recEnd - t.pos;
                    SetScannerBehindT();
                }
                t.kind = recKind; 
                break;
			case 1:
				recEnd = pos; recKind = 1;
				if (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 1;}
				else {t.kind = 1; t.val = new String(tval, 0, tlen); CheckLiteral(); return t;}
			case 2:
				if (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 2;}
				else if (ch == '"') {AddCh(); goto case 3;}
				else {goto case 0;}
			case 3:
				{t.kind = 1; t.val = new String(tval, 0, tlen); CheckLiteral(); return t;}
			case 4:
				{
					tlen -= apx;
					SetScannerBehindT();
					t.kind = 2; break;}
			case 5:
				recEnd = pos; recKind = 3;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 5;}
				else if (ch == 'E' || ch == 'e') {AddCh(); goto case 6;}
				else {t.kind = 3; break;}
			case 6:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 8;}
				else if (ch == '+' || ch == '-') {AddCh(); goto case 7;}
				else {goto case 0;}
			case 7:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 8;}
				else {goto case 0;}
			case 8:
				recEnd = pos; recKind = 3;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 8;}
				else {t.kind = 3; break;}
			case 9:
				recEnd = pos; recKind = 3;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 9;}
				else if (ch == 'E' || ch == 'e') {AddCh(); goto case 10;}
				else {t.kind = 3; break;}
			case 10:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 12;}
				else if (ch == '+' || ch == '-') {AddCh(); goto case 11;}
				else {goto case 0;}
			case 11:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 12;}
				else {goto case 0;}
			case 12:
				recEnd = pos; recKind = 3;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 12;}
				else {t.kind = 3; break;}
			case 13:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 15;}
				else if (ch == '+' || ch == '-') {AddCh(); goto case 14;}
				else {goto case 0;}
			case 14:
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 15;}
				else {goto case 0;}
			case 15:
				recEnd = pos; recKind = 3;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 15;}
				else {t.kind = 3; break;}
			case 16:
				if (ch <= 9 || ch >= 11 && ch <= 12 || ch >= 14 && ch <= '&' || ch >= '(' && ch <= 65535) {AddCh(); goto case 16;}
				else if (ch == 39) {AddCh(); goto case 27;}
				else {goto case 0;}
			case 17:
				{t.kind = 5; break;}
			case 18:
				{t.kind = 6; break;}
			case 19:
				{t.kind = 7; break;}
			case 20:
				{t.kind = 8; break;}
			case 21:
				{t.kind = 9; break;}
			case 22:
				{t.kind = 10; break;}
			case 23:
				{t.kind = 11; break;}
			case 24:
				recEnd = pos; recKind = 2;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 24;}
				else if (ch == '.') {apx++; AddCh(); goto case 28;}
				else if (ch == 'E' || ch == 'e') {AddCh(); goto case 13;}
				else {t.kind = 2; break;}
			case 25:
				recEnd = pos; recKind = 1;
				if (ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 29;}
				else if (ch >= '0' && ch <= '9') {AddCh(); goto case 1;}
				else {t.kind = 1; t.val = new String(tval, 0, tlen); CheckLiteral(); return t;}
			case 26:
				if (ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 2;}
				else if (ch == '_') {AddCh(); goto case 30;}
				else {goto case 0;}
			case 27:
				recEnd = pos; recKind = 4;
				if (ch == 39) {AddCh(); goto case 16;}
				else {t.kind = 4; break;}
			case 28:
				if (ch <= '/' || ch >= ':' && ch <= 65535) {apx++; AddCh(); goto case 4;}
				else if (ch >= '0' && ch <= '9') {apx = 0; AddCh(); goto case 9;}
				else {goto case 0;}
			case 29:
				recEnd = pos; recKind = 1;
				if (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 29;}
				else {t.kind = 1; t.val = new String(tval, 0, tlen); CheckLiteral(); return t;}
			case 30:
				if (ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 31;}
				else if (ch >= '0' && ch <= '9') {AddCh(); goto case 2;}
				else if (ch == '"') {AddCh(); goto case 3;}
				else {goto case 0;}
			case 31:
				if (ch >= '0' && ch <= '9' || ch >= 'A' && ch <= 'Z' || ch == '_' || ch >= 'a' && ch <= 'z') {AddCh(); goto case 31;}
				else if (ch == '"') {AddCh(); goto case 3;}
				else {goto case 0;}
			case 32:
				if (ch == '|') {AddCh(); goto case 33;}
				else {goto case 0;}
			case 33:
				{t.kind = 20; break;}
			case 34:
				if (ch == '&') {AddCh(); goto case 35;}
				else {goto case 0;}
			case 35:
				{t.kind = 21; break;}
			case 36:
				{t.kind = 24; break;}
			case 37:
				{t.kind = 25; break;}
			case 38:
				{t.kind = 26; break;}
			case 39:
				{t.kind = 27; break;}
			case 40:
				recEnd = pos; recKind = 35;
				if (ch >= '0' && ch <= '9') {AddCh(); goto case 5;}
				else {t.kind = 35; break;}
			case 41:
				if (ch == '>') {AddCh(); goto case 22;}
				else if (ch == '=') {AddCh(); goto case 38;}
				else {goto case 0;}
			case 42:
				recEnd = pos; recKind = 22;
				if (ch == '=') {AddCh(); goto case 36;}
				else {t.kind = 22; break;}
			case 43:
				recEnd = pos; recKind = 23;
				if (ch == '=') {AddCh(); goto case 37;}
				else {t.kind = 23; break;}
			case 44:
				recEnd = pos; recKind = 29;
				if (ch == '=') {AddCh(); goto case 39;}
				else {t.kind = 29; break;}

        }
        t.val = new string(tval, 0, tlen);
        return t;
    }
}

