
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using Time_Line_Of_Me.Application.Services;
using Time_Line_Of_Me.Core.Models;
using Time_Line_Of_Me.Server.Contracts;


namespace Time_Line_Of_Me.Server.Controllers;

[ApiController]
[Route("[controller]")]

public class BooksController : ControllerBase
{
    public readonly IBookService _bookService;
    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]

    public async Task<ActionResult<List<BooksResponse>>> GetBooks()
    {
        var books = await _bookService.GetAllBooks();

        var response = books.Select(book => new BooksResponse
        (
           book.Id,
           book.Title,
           book.Description,
           book.Author,
           book.PublishedDate
        ));
        return Ok(response);
    }



    [HttpPost]
    public async Task<ActionResult<Guid>> CreateBook([FromBody] BooksRequest request)
    {
        if (string.IsNullOrEmpty(request.PublishedDate))
        {
            return BadRequest("The date cannot be empty");
        }
        DateTime publishedDate;
        bool isValidDate = DateTime.TryParse(request.PublishedDate, out publishedDate);
        if (!isValidDate)
        {
            isValidDate = DateTime.TryParseExact(request.PublishedDate, "yyyy-MM-dd",
                                                  CultureInfo.InvariantCulture,
                                                  DateTimeStyles.None, out publishedDate);

            if (!isValidDate)
            {
                return BadRequest("Incorrect date format");
            }
        }

        if (publishedDate > DateTime.Now)
        {
            return BadRequest("The date cannot be in the future");
        }

        var (book, error) = Book.Create(
                Guid.NewGuid(),
                request.Title,
                request.Description,
                request.Author,
                publishedDate);

        if (!string.IsNullOrEmpty(error))
        {
            return BadRequest(error);
        }


        var bookId = await _bookService.CreateBook(book);    

        return Ok(bookId); 

    }



    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateBook(Guid id, [FromBody] BooksRequest request)
    {
        if (string.IsNullOrEmpty(request.PublishedDate))
        {
            return BadRequest("The date cannot be empty");
        }


        DateTime publishedDate;
        bool isValidDate = DateTime.TryParse(request.PublishedDate, out publishedDate);
        if (!isValidDate)
        {
            isValidDate = DateTime.TryParseExact(request.PublishedDate, "yyyy-MM-dd",
                                                  CultureInfo.InvariantCulture,
                                                  DateTimeStyles.None, out publishedDate);
            if (!isValidDate)
            {
                return BadRequest("Incorrect date format");
            }
        }
        if (publishedDate > DateTime.Now)
        {
            return BadRequest("The date cannot be in the future");
        }





        var bookId = await _bookService.UpdateBook(id, request.Title, request.Author, request.Description, publishedDate);
        return Ok(bookId);
    }


    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteBook(Guid id)
    {
        return Ok(await _bookService.DeleteBook(id));
    }

}
