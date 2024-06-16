using System.Collections.Generic;
using System.Threading.Tasks;
using backend_c_.Models;

namespace backend_c_.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<Task>> GetTasksAsync();
        Task<Task> GetTaskByIdAsync(int id);
        Task AddTaskAsync(Task task);
        Task UpdateTaskAsync(Task task);
        Task DeleteTaskAsync(int id);
    }
}
