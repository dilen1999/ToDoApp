using Microsoft.EntityFrameworkCore;

namespace backend_c_.model // Adjust namespace as per your project structure
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Fluent API configurations if needed
        }
    }
}
