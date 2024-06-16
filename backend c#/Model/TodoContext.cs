using Microsoft.EntityFrameworkCore;

namespace TodoApiBackend.Model
{
    public class TodoContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source=./todo.db");
        }

        public DbSet<TaskItem> TodoTasks { get; set; }
    }
}
