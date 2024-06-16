using System.Collections.Generic;
using System.Linq;
using TodoApiBackend.Model;

namespace TodoApiBackend.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public List<TaskItem> GetTodoTasks()
        {
            if (_context.TodoTasks.Count() == 0)
            {
                throw new Exception("Tasks empty");
            }else{
                return _context.TodoTasks.Where (t=>t.IsDone==false).ToList();
            }
        }

        public List<TaskItem> GetImportantTodoTasks()
        {
            if (_context.TodoTasks.Where(t=>t.IsImportant==true).Count() == 0)
            {
                throw new Exception("No important tasks");
            }else{
                return _context.TodoTasks.Where(t=>t.IsImportant==true).ToList();
            }
        }

        public List<TaskItem> GetCompletedTodoTasks()
        {
            if (_context.TodoTasks.Where(t=>t.IsDone==true).Count() == 0)
            {
                throw new Exception("No completed tasks");
            }else{
                return _context.TodoTasks.Where(t=>t.IsDone==true).ToList();
            }
        }

        public TaskItem GetTodoTask(int id)
        {
            var task = _context.TodoTasks.Find(id);
            if (task == null)
            {
                throw new Exception("Task not found");
            }else{
                return task;
            }
        }

        public TaskItem CreateTodoTask(TaskItem todoTask)
        {
            if (_context.TodoTasks.Any(t => t.Name == todoTask.Name))
            {
                throw new Exception("Task already exists");
            }
            else
            {
                _context.TodoTasks.Add(todoTask);
                _context.SaveChanges();
                return todoTask;
            }
        }

        public TaskItem UpdateTodoTask(TaskItem todoTask)
        {
            var task = _context.TodoTasks.Find(todoTask.Id);
            if (task == null)
            {
                throw new Exception("Task not found");
            }
            else
            {
                task.Name = todoTask.Name;
                task.IsDone = todoTask.IsDone;
                task.IsImportant = todoTask.IsImportant;
                task.Description = todoTask.Description; // Update description
                _context.SaveChanges();
                return task;
            }
        }

        public void DeleteTodoTask(int id)
        {
            var task = _context.TodoTasks.Find(id);
            if (task == null)
            {
                throw new Exception("Task not found");
            }
            else
            {
                _context.TodoTasks.Remove(task);
                _context.SaveChanges();
            }
        }
    }
}
