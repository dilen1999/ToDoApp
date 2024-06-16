using System.Collections.Generic;
using System.Threading.Tasks;
using backend_c_.model; // Adjust namespace as per your project structure

namespace backend_c_.repository // Adjust namespace as per your project structure
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Task>> GetTasksAsync();
        Task<Task> GetTaskByIdAsync(int id);
        Task AddTaskAsync(Task task);
        Task UpdateTaskAsync(Task task);
        Task DeleteTaskAsync(int id);
    }
}
