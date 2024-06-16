using System.Collections.Generic;
using TodoApiBackend.Model;

namespace TodoApiBackend.Repositories
{
    public interface ITodoRepository
    {
        List<TaskItem> GetTodoTasks();
        List<TaskItem> GetImportantTodoTasks();
        List<TaskItem> GetCompletedTodoTasks();
        TaskItem GetTodoTask(int id);
        TaskItem CreateTodoTask(TaskItem taskItem);
        TaskItem UpdateTodoTask(TaskItem taskItem);
        void DeleteTodoTask(int id);
    }
}
