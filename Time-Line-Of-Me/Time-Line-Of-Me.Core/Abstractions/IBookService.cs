using Time_Line_Of_Me.Core.Models;

namespace Time_Line_Of_Me.Application.Services
{
    public interface IBookService
    {
        Task<Guid> CreateBook(Book book);
        Task<Guid> DeleteBook(Guid id);
        Task<List<Book>> GetAllBooks();
        Task<Guid> UpdateBook(Guid id, string title, string author, string description, DateTime publishedDate);
    }
}