using System;
using System.Collections.Generic;
using System.Text;

namespace Time_Line_Of_Me.Core.Models
{
    public class Book
    {
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


        public static (Book book , string error) Create(Guid id ,string title, string description, string author, DateTime publishedDate)
        {
            var error = string.Empty;

            if (string.IsNullOrWhiteSpace(title))
            {
                error = "Title cannot be empty.";
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


        }

    }
}
