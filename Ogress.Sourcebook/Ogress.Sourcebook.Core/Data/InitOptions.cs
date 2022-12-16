namespace Ogress.Sourcebook.Data;

public record class InitOptions(string ConnectionString, string QueryCompiler, FileSystemInfo[] Directory);
