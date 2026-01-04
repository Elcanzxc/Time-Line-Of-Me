
using Microsoft.AspNetCore.Mvc;
using Time_Line_Of_Me.Application.Services;
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

}
