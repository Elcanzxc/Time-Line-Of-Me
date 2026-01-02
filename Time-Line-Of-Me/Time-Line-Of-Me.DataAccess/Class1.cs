using Microsoft.EntityFrameworkCore;

namespace Time_Line_Of_Me.DataAccess
{
    public class Time_Line_Of_MeDbContext : DbContext
    {
        public Time_Line_Of_MeDbContext(DbContextOptions<Time_Line_Of_MeDbContext> options) : base(options)
        {



        }
    }
}
