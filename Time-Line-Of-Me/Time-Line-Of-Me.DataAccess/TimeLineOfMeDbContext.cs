using Microsoft.EntityFrameworkCore;

namespace Time_Line_Of_Me.DataAccess
{
    public class TimeLineOfMeDbContext : DbContext
    {
        public TimeLineOfMeDbContext(DbContextOptions<TimeLineOfMeDbContext> options) : base(options)
        {

        }

        public DbSet<Entities.BookEntity> Books { get; set; } = null!;
    }
}
