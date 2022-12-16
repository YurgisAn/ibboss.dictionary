using Ogress.Sourcebook.Configuration;

namespace Ogress.Sourcebook;

public sealed class CurrentBookService
{
    public BookInfo? Info { get; private set; }

    public void SetCurrentBook(BookInfo? info)
    {
        Info = info;
        NotifyStateChanged();
    }

    public event Action? OnChange;
    private void NotifyStateChanged() => OnChange?.Invoke();

}