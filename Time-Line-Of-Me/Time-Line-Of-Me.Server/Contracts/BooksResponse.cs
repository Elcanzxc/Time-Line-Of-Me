namespace Time_Line_Of_Me.Server.Contracts;


    public record BooksResponse(
        Guid Id,
        string Title,
        string Description,
        string Author,
        DateTime PublishedDate
    );





