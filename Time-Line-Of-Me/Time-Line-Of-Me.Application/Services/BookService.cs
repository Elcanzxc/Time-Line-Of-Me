
using Time_Line_Of_Me.Core.Models;
using Time_Line_Of_Me.DataAccess.Repositories;

namespace Time_Line_Of_Me.Application.Services;


public class BookService : IBookService
{
    public readonly IBooksRepository _booksRepository;

    public BookService(IBooksRepository booksRepository)
    {

        _booksRepository = booksRepository;

    }



    public async Task<List<Book>> GetAllBooks()
    {
        return await _booksRepository.Get();
    }

    public async Task<Guid> CreateBook(Book book)
    {
        return await _booksRepository.Create(book);
    }

    public async Task<Guid> UpdateBook(Guid id, string title, string author, string description, DateTime publishedDate)
    {
        return await _booksRepository.Update(id, title, author, description, publishedDate);
    }

    public async Task<Guid> DeleteBook(Guid id)
    {
        return await _booksRepository.Delete(id);

    }

}
