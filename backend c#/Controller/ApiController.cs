using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoApiBackend.Model;
using TodoApiBackend.Services;

namespace TodoApiBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // POST: api/Todo
        [HttpPost]
        public ActionResult<TaskItem> CreateTodoTask([FromBody] CreateRequest createRequest)
        {
            try
            {
                return _todoService.CreateTodoTask(createRequest.TaskName, createRequest.IsImportant, createRequest.Description);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/todo
        [HttpGet]
        public ActionResult<List<TaskItem>> GetTodoTasks()
        {
            try
            {
                var tasks = _todoService.GetTodoTasks();
                return tasks;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/todo/important
        [HttpGet("important")]
        public ActionResult<List<TaskItem>> GetImportantTodoTasks()
        {
            try
            {
                var tasks = _todoService.GetImportantTodoTasks();
                return tasks;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/todo/completed
        [HttpGet("completed")]
        public ActionResult<List<TaskItem>> GetCompletedTodoTasks()
        {
            try
            {
                var tasks = _todoService.GetCompletedTodoTasks();
                return tasks;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTodoTask(int id)
        {
            try
            {
                var task = _todoService.GetTodoTask(id);
                if (task == null)
                {
                    return NotFound();
                }
                return task;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: api/todo
        [HttpPut]
        public ActionResult<TaskItem> UpdateTodoTask([FromBody] TaskItem updateTaskRequest)
        {
            try
            {
               return _todoService.UpdateTodoTask(updateTaskRequest);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTodoTask(int id)
        {
            try
            {
                _todoService.DeleteTodoTask(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("done/{id}")]
        public ActionResult<TaskItem> MarkTaskAsDone(int id)
        {
            try
            {
                return _todoService.MarkTaskAsDone(id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public record CreateRequest
        {
            public string TaskName { get; set; }
            public bool IsImportant { get; set; }
            public string Description { get; set; }
        }
    }
}
