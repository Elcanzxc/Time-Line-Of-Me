using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Time_Line_Of_Me.Core.Models;
using Time_Line_Of_Me.DataAccess.Entities;
namespace Time_Line_Of_Me.DataAccess.Repositories;

public class BookRepository : IBooksRepository
{


    private readonly TimeLineOfMeDbContext _context;

    public BookRepository(TimeLineOfMeDbContext context)
    {

        _context = context;

    }

    public async Task<List<Book>> Get()
    {

        var booksEntities = await _context.Books
            .AsNoTracking()
            .ToListAsync();


        var books = booksEntities
            .Select(b => Book.Create(b.Id, b.Title, b.Description, b.Author, b.PublishedDate).Book)
            .ToList();

        return books;
    }

    public async Task<Guid> Create(Book book)
    {


        var bookEntity = new BookEntity
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Author = book.Author,
            PublishedDate = book.PublishedDate
        };

        await _context.Books.AddAsync(bookEntity);
        await _context.SaveChangesAsync();

        return bookEntity.Id;

    }


    public async Task<Guid> Update(Guid id, string title, string author,string description, DateTime publishedDate)
    {
        await _context.Books
            .Where(b => b.Id == id)
            .ExecuteUpdateAsync(b => b
                .SetProperty(b => b.Title, title)
                .SetProperty(b => b.Author, author)
                .SetProperty(b => b.Description, description)
                .SetProperty(b => b.PublishedDate, publishedDate)

            );


        return id;
    }


    public async Task<Guid> Delete(Guid id)
    {
        await _context.Books
            .Where(b => b.Id == id)
            .ExecuteDeleteAsync();
        return id;
    }

}
