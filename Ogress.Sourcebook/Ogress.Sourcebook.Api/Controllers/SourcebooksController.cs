using Microsoft.AspNetCore.Mvc;
using Ogress.Sourcebook.Configuration;
using Ogress.Sourcebook.Data;
using Ogress.Sourcebook.QueryModel;

namespace Ogress.Sourcebook.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class SourcebooksController : ControllerBase
{
    private const string ConnectionStrings = nameof(ConnectionStrings);
    private const string Sourcebooks = nameof(Sourcebooks);
    private const string QueryCompiler = nameof(QueryCompiler);
    private const string BookFolder = "books";

    private readonly ILogger<SourcebooksController> logger;
    private readonly IConfiguration configuration;
    private readonly IWebHostEnvironment environment;

    public SourcebooksController(ILogger<SourcebooksController> logger, IConfiguration configuration, IWebHostEnvironment environment)
    {
        this.logger = logger;
        this.configuration = configuration;
        this.environment = environment;
    }

    private InitOptions GetInitOptions() =>
         new(
            configuration.GetSection(ConnectionStrings).GetValue<string>(Sourcebooks),
            configuration.GetSection(Sourcebooks).GetValue<string>(QueryCompiler) ?? throw new SourcebookException($"Missing required \"{QueryCompiler}\" parameter."),
            environment.WebRootFileProvider.GetDirectoryContents(BookFolder)
                .Select(d => d.IsDirectory ? (FileSystemInfo)new DirectoryInfo(d.PhysicalPath) : new FileInfo(d.PhysicalPath))
                .ToArray()
            );

    private Book GetData(string name) => Book.Obtain(name, GetInitOptions());

    [HttpGet("directory")]
    public BookEntry[] GetDirectory()
    {
        return Book.GetDirectory(GetInitOptions());
    }

    [HttpGet("{name}")]
    public BookInfo Get(string name)
    {
        return GetData(name).GetMetadata();
    }

    [HttpPut("count/{name}")]
    public int GetRowCount(string name, QueryNode? query)
    {
        return GetData(name).GetRecordCount(query);
    }

    [HttpPut("data/{name}/{take}/{skip}/{sortColumn}/{asc}")]
    public List<Dictionary<string, string>> GetData(string name, int take, int skip, string? sortColumn, bool asc, QueryNode? query)
    {
        return GetData(name).GetRows(take, skip, sortColumn, asc, query);
    }

    [HttpPut("list/{name}/{listName}")]
    public List<ListEntry> GetList(string name, string listName)
    {
        return GetData(name).GetList(listName);
    }
}