using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApiBackend.Model;

namespace TodoApiBackend.Services
{
    public interface ITodoService
    {
        List<TaskItem> GetTodoTasks();
        List<TaskItem> GetImportantTodoTasks();
        List<TaskItem> GetCompletedTodoTasks();
        TaskItem GetTodoTask(int id); 
        TaskItem CreateTodoTask(string todoTask, bool isImportant);
        TaskItem UpdateTodoTask(TaskItem todoTask);
        void DeleteTodoTask(int id);
        ActionResult<TaskItem> MarkTaskAsDone(int id);
    }
}
