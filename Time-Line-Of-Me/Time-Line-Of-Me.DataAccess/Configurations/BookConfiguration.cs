using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using Time_Line_Of_Me.Core.Models;
using Time_Line_Of_Me.DataAccess.Entities;

namespace Time_Line_Of_Me.DataAccess.Configurations
{
    internal class BookConfiguration : IEntityTypeConfiguration<BookEntity>
    {
        public void Configure(EntityTypeBuilder<BookEntity> builder)
        {
           builder.HasKey( x => x.Id );


            builder.Property( x => x.Title )
                .IsRequired()
                .HasMaxLength( Book.MAX_TITLE_LENGTH );

            builder.Property(x => x.Description)
                 .IsRequired();

            builder.Property(x => x.Author)
                 .IsRequired();

            builder.Property(x => x.PublishedDate)
                   .IsRequired();

            builder.ToTable(t => t.HasCheckConstraint("CK_Book_PublishedDate_NotFuture", "PublishedDate <= GETDATE()"));
        }
    }
}
