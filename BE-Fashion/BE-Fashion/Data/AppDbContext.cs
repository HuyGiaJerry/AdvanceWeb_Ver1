using Microsoft.EntityFrameworkCore;
using BE_Fashion.Models;
namespace BE_Fashion.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
