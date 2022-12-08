using Npgsql;
using NpgsqlTypes;
using VTB.Sourcebook.QueryModel;

namespace VTB.Sourcebook.Data;

public sealed class DataReader
{
    public string ConnectionString { get; }

    public DataReader(string connectionString) => ConnectionString = connectionString;

    public int GetRecordCount(QueryCompiler generator, QueryNode? filter)
    {
        using var conn = new NpgsqlConnection(ConnectionString);
        conn.Open();
        using var cmd = new NpgsqlCommand(generator.GenerateCountSql(filter), conn);
        cmd.CommandType = System.Data.CommandType.Text;
        AddParameters(cmd, generator);
        return Convert.ToInt32(cmd.ExecuteScalar());
    }

    public List<Dictionary<string, object>> GetRecords(QueryCompiler compiler, QueryNode? filter)
    {
        var sql = compiler.GenerateStatement(filter);
        using var conn = new NpgsqlConnection(ConnectionString);
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        AddParameters(cmd, compiler);
        using var reader = cmd.ExecuteReader();
        var fieldInfos = compiler.Info.Fields.ToDictionary(fi => fi.Alias!, fi => fi);
        var rows = new List<Dictionary<string, object>>();

        while (reader.Read())
        {
            var fields = new Dictionary<string, object>();

            for (var i = 0; i < reader.FieldCount; i++)
            {
                var (name, value) = (reader.GetName(i), reader.GetValue(i));
                fields.Add(name, value);
            }

            rows.Add(fields);
        }

        return rows;
    }

    //private string FormatValue(string field, object value, Dictionary<string, FieldInfo> infos)
    //{
    //    if (value is null or DBNull)
    //        return "";

    //    var inf = infos[field];

    //    if (inf.Formatter is null)
    //        return inf.Format is null ? (value.ToString() ?? "")
    //            : string.Format("{0:" + inf.Format + "}", value);

    //    if (!ValueFormatter.Formatters.TryGetValue(inf.Formatter, out var fmt))
    //        throw new SourcebookException($"Unknown formatter \"{inf.Formatter}\".");

    //    return fmt.Format(value, inf.Format);
    //}

    private void AddParameters(NpgsqlCommand cmd, QueryCompiler generator)
    {
        foreach (var kv in generator.GetParameters())
        {
            var dbType = kv.Value.Type switch
            {
                LiteralType.Number => NpgsqlDbType.Integer,
                LiteralType.String => NpgsqlDbType.Varchar,
                LiteralType.Date => NpgsqlDbType.Date,
                _ => throw new SourcebookException($"Invalid literal type \"{kv.Value.Type}\".")
            };

            cmd.Parameters.AddWithValue(kv.Key, dbType, kv.Value.Value);
        }
    }
}