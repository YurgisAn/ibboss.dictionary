using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook.Lists;

public interface IListProvider
{
    void Initialize(List<OptionEntry>? options);

    IEnumerable<ListEntry> GetEntries();
}
