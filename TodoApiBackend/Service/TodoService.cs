using Microsoft.AspNetCore.Mvc;
using TodoApiBackend.Model;
using TodoApiBackend.Repositories;

namespace TodoApiBackend.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        
        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        
        
        public TaskItem CreateTodoTask(string taskName, bool isImportant)
        {
            try
            {
                TaskItem task = new TaskItem
                {
                    Name = taskName,
                    IsImportant = isImportant
                };
                return _todoRepository.CreateTodoTask(task);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public List<TaskItem> GetTodoTasks()
        {
            try
            {
                return _todoRepository.GetTodoTasks();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public List<TaskItem> GetImportantTodoTasks()
        {
            try
            {
                return _todoRepository.GetImportantTodoTasks();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public List<TaskItem> GetCompletedTodoTasks()
        {
            try
            {
                return _todoRepository.GetCompletedTodoTasks();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public TaskItem GetTodoTask(int id)
        {
            try
            {
                return _todoRepository.GetTodoTask(id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public TaskItem UpdateTodoTask(TaskItem todoTask)
        {
            try
            {
                return _todoRepository.UpdateTodoTask(todoTask);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
        public void DeleteTodoTask(int id)
        {
            try
            {
                _todoRepository.DeleteTodoTask(id);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public ActionResult<TaskItem> MarkTaskAsDone(int id)
        {
            try
            {
                TaskItem task = _todoRepository.GetTodoTask(id);
                if (task == null)
                {
                    throw new Exception("Task not found");
                }

                task.IsDone = true;
                _todoRepository.UpdateTodoTask(task);
                return new OkObjectResult(task);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
    }
}
