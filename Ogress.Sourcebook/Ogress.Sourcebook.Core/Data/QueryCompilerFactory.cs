using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Data;

internal class QueryCompilerFactory
{
    private const string Postgres = "postgres";

    private static readonly Dictionary<string, Type> compilers = new()
    {
        { Postgres, typeof(PostgresQueryCompiler) }
    };

    public static IQueryCompiler Obtain(string key, ExternalSourceInfo info)
    {
        if (!compilers.TryGetValue(key, out var compilerType))
            throw new SourcebookException($"Unknown query compiler \"{key}\".");

        IQueryCompiler compiler;

        try
        {
             compiler = (IQueryCompiler)Activator.CreateInstance(compilerType)!;
        }
        catch (Exception ex)
        {
            throw new SourcebookException($"Unable to initialize compiler \"{key}\" of type \"{compilerType}\".", ex);
        }

        compiler.Initialize(info);
        return compiler;
    }
}
