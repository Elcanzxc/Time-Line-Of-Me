using Time_Line_Of_Me.Core.Models;

namespace Time_Line_Of_Me.DataAccess.Repositories
{
    public interface IBooksRepository
    {
        Task<Guid> Create(Book book);
        Task<Guid> Delete(Guid id);
        Task<List<Book>> Get();
        Task<Guid> Update(Guid id, string title, string description, DateTime publishedDate);
    }
}