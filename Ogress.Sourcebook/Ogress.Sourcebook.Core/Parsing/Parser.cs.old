
#nullable disable
using Ogress.Sourcebook.QueryModel;
using System.Text;


namespace Ogress.Sourcebook.Parsing;

internal sealed partial class Parser 
{
	public const int _EOF = 0;
	public const int _ident = 1;
	public const int _intTok = 2;
	public const int _realTok = 3;
	public const int _stringTok = 4;
	public const int _parenLeftToken = 5;
	public const int _parenRightToken = 6;
	public const int _curlyLeftToken = 7;
	public const int _curlyRightToken = 8;
	public const int _commaToken = 9;
	public const int _arrow = 10;
	public const int _semicolon = 11;
	public const int _else = 12;
	public const int _if = 13;
	public const int _while = 14;
	public const int _continue = 15;
	public const int _break = 16;
	public const int _return = 17;
	public const int _function = 18;
	public const int _length = 19;
	public const int maxT = 36;



//

	void OrExpr(out QueryNode exp) {
		AndExpr(out exp);
		while (la.kind == 20) {
			Get();
			AndExpr(out var cnode);
			exp = new OrNode(exp, cnode); 
		}
	}

	void AndExpr(out QueryNode exp) {
		EqExpr(out exp);
		while (la.kind == 21) {
			Get();
			EqExpr(out var cnode);
			exp = new AndNode(exp, cnode); 
		}
	}

	void EqExpr(out QueryNode exp) {
		NotExpr(out exp);
		while (StartOf(1)) {
			var op = BinaryOperator.None; 
			switch (la.kind) {
			case 22: {
				Get();
				op = BinaryOperator.Greater; 
				break;
			}
			case 23: {
				Get();
				op = BinaryOperator.Lesser; 
				break;
			}
			case 24: {
				Get();
				op = BinaryOperator.GreaterOrEquals; 
				break;
			}
			case 25: {
				Get();
				op = BinaryOperator.LesserOrEquals; 
				break;
			}
			case 26: {
				Get();
				op = BinaryOperator.Equals; 
				break;
			}
			case 27: {
				Get();
				op = BinaryOperator.NotEquals; 
				break;
			}
			case 28: {
				Get();
				op = BinaryOperator.Like; 
				break;
			}
			}
			NotExpr(out var cnode);
			exp = new BinaryNode(op, exp, cnode); 
		}
	}

	void NotExpr(out QueryNode exp) {
		exp = null; 
		if (StartOf(2)) {
			BetweenExpr(out exp);
		} else if (la.kind == 29) {
			Get();
			BetweenExpr(out exp);
			exp = new NotNode(exp); 
		} else SynErr(37);
	}

	void BetweenExpr(out QueryNode exp) {
		LiteralExpr(out exp);
		if (la.kind == 30) {
			Get();
			LiteralExpr(out var lower);
			Expect(31);
			LiteralExpr(out var upper);
			exp = new BetweenNode(exp, lower, upper); 
		}
	}

	void LiteralExpr(out QueryNode exp) {
		exp = null; 
		switch (la.kind) {
		case 4: {
			StringExpr(out exp);
			break;
		}
		case 2: case 3: {
			NumberExpr(out exp);
			break;
		}
		case 32: case 33: {
			BoolExpr(out exp);
			break;
		}
		case 34: {
			NullExpr(out exp);
			break;
		}
		case 1: {
			NameExpr(out exp);
			break;
		}
		case 5: {
			GroupExpr(out exp);
			break;
		}
		default: SynErr(38); break;
		}
	}

	void StringExpr(out QueryNode exp) {
		Expect(4);
		exp = new LiteralNode(LiteralType.String, t.val.Trim('\'')); 
	}

	void NumberExpr(out QueryNode exp) {
		exp = null; 
		if (la.kind == 2) {
			Get();
		} else if (la.kind == 3) {
			Get();
		} else SynErr(39);
		exp = new LiteralNode(LiteralType.Number, TryParseNumber()); 
	}

	void BoolExpr(out QueryNode exp) {
		if (la.kind == 32) {
			Get();
		} else if (la.kind == 33) {
			Get();
		} else SynErr(40);
		exp = new LiteralNode(LiteralType.Number, t.val == "true" ? 1 : 0); 
	}

	void NullExpr(out QueryNode exp) {
		Expect(34);
		exp = new LiteralNode(LiteralType.Null, DBNull.Value); 
	}

	void NameExpr(out QueryNode exp) {
		var sb = new StringBuilder(); 
		Expect(1);
		sb.Append(t.val); 
		while (la.kind == 35) {
			Get();
			Expect(1);
			sb.Append('.'); sb.Append(t.val); 
		}
		exp = new NameNode(sb.ToString()); 
	}

	void GroupExpr(out QueryNode exp) {
		Expect(5);
		OrExpr(out exp);
		Expect(6);
	}

	void QL() {
		OrExpr(out var exp);
		Expression = exp; 
	}


//		QL();


    private static readonly bool[,] set = {
		{T,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x},
		{x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,T,T, T,T,T,T, T,x,x,x, x,x,x,x, x,x},
		{x,T,T,T, T,T,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, x,x,x,x, T,T,T,x, x,x}

    };

    private void SynErr (int line, int col, int n)
    {
        string s;
        switch (n) 
        {
			case 0: s = "EOF expected"; break;
			case 1: s = "ident expected"; break;
			case 2: s = "intTok expected"; break;
			case 3: s = "realTok expected"; break;
			case 4: s = "stringTok expected"; break;
			case 5: s = "parenLeftToken expected"; break;
			case 6: s = "parenRightToken expected"; break;
			case 7: s = "curlyLeftToken expected"; break;
			case 8: s = "curlyRightToken expected"; break;
			case 9: s = "commaToken expected"; break;
			case 10: s = "arrow expected"; break;
			case 11: s = "semicolon expected"; break;
			case 12: s = "else expected"; break;
			case 13: s = "if expected"; break;
			case 14: s = "while expected"; break;
			case 15: s = "continue expected"; break;
			case 16: s = "break expected"; break;
			case 17: s = "return expected"; break;
			case 18: s = "function expected"; break;
			case 19: s = "length expected"; break;
			case 20: s = "\"||\" expected"; break;
			case 21: s = "\"&&\" expected"; break;
			case 22: s = "\">\" expected"; break;
			case 23: s = "\"<\" expected"; break;
			case 24: s = "\">=\" expected"; break;
			case 25: s = "\"<=\" expected"; break;
			case 26: s = "\"==\" expected"; break;
			case 27: s = "\"!=\" expected"; break;
			case 28: s = "\"like\" expected"; break;
			case 29: s = "\"!\" expected"; break;
			case 30: s = "\"between\" expected"; break;
			case 31: s = "\"and\" expected"; break;
			case 32: s = "\"true\" expected"; break;
			case 33: s = "\"false\" expected"; break;
			case 34: s = "\"null\" expected"; break;
			case 35: s = "\".\" expected"; break;
			case 36: s = "??? expected"; break;
			case 37: s = "invalid NotExpr"; break;
			case 38: s = "invalid LiteralExpr"; break;
			case 39: s = "invalid NumberExpr"; break;
			case 40: s = "invalid BoolExpr"; break;

            default: s = "error " + n; break;
        }
        
        throw Error(s, line, col);
    }
}

