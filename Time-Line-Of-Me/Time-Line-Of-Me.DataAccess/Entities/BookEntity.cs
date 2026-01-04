using System;
using System.Collections.Generic;
using System.Text;

namespace Time_Line_Of_Me.DataAccess.Entities
{
    public class BookEntity
    {

        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public DateTime PublishedDate { get; set; }

    }
}
