using System;
using System.Collections.Generic;
using System.Linq;
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

    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public List<TaskItem> GetTodoTasks()
        {
            var tasks = _context.TodoTasks.Where(t => !t.IsDone).ToList();
            if (tasks.Count == 0)
            {
                throw new Exception("No pending tasks found.");
            }
            return tasks;
        }

        public List<TaskItem> GetImportantTodoTasks()
        {
            var tasks = _context.TodoTasks.Where(t => t.IsImportant).ToList();
            if (tasks.Count == 0)
            {
                throw new Exception("No important tasks found.");
            }
            return tasks;
        }

        public List<TaskItem> GetCompletedTodoTasks()
        {
            var tasks = _context.TodoTasks.Where(t => t.IsDone).ToList();
            if (tasks.Count == 0)
            {
                throw new Exception("No completed tasks found.");
            }
            return tasks;
        }

        public TaskItem GetTodoTask(int id)
        {
            var task = _context.TodoTasks.Find(id);
            if (task == null)
            {
                throw new Exception($"Task with id {id} not found.");
            }
            return task;
        }

        public TaskItem CreateTodoTask(TaskItem todoTask)
        {
            if (_context.TodoTasks.Any(t => t.Name == todoTask.Name))
            {
                throw new Exception("Task with the same name already exists.");
            }
            _context.TodoTasks.Add(todoTask);
            _context.SaveChanges();
            return todoTask;
        }

        public TaskItem UpdateTodoTask(TaskItem todoTask)
        {
            var task = _context.TodoTasks.Find(todoTask.Id);
            if (task == null)
            {
                throw new Exception($"Task with id {todoTask.Id} not found.");
            }

            task.Name = todoTask.Name;
            task.IsDone = todoTask.IsDone;
            task.IsImportant = todoTask.IsImportant;
            _context.SaveChanges();
            return task;
        }

        public void DeleteTodoTask(int id)
        {
            var task = _context.TodoTasks.Find(id);
            if (task == null)
            {
                throw new Exception($"Task with id {id} not found.");
            }

            _context.TodoTasks.Remove(task);
            _context.SaveChanges();
        }
    }
}
