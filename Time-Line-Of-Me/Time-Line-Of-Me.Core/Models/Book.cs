using System;
using System.Collections.Generic;
using System.Text;

namespace Time_Line_Of_Me.Core.Models
{
    public class Book
    {

        public const int MAX_TITLE_LENGTH = 200;

        public Guid Id { get; }

        public string Title { get; }

        public string Description { get; }

        public string Author { get; }  

        public DateTime PublishedDate { get; }



        private Book(Guid id, string title, string description, string author, DateTime publishedDate)
        {
            Id = id;
            Title = title;
            Description = description;
            Author = author;
            PublishedDate = publishedDate;
        }


        public static (Book Book , string Error) Create(Guid id ,string title, string description, string author, DateTime publishedDate)
        {
            var error = string.Empty;

            if (string.IsNullOrWhiteSpace(title) || title.Length > MAX_TITLE_LENGTH)
            {
                error = "Title cannot be empty or longer than 250 symbols.";
            }
            if (string.IsNullOrWhiteSpace(author))
            {
                error = "Author cannot be empty.";
            }
            if (publishedDate > DateTime.Now)
            {
                error = "Published date cannot be in the future.";
            }


            var book = new Book(id, title, description?? string.Empty, author, publishedDate);

            return (book, error);


        }// Улучшить в дальнейшем валидацию и обработку ошибок

    }
}
