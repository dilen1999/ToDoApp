using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_c_.model
{
    [Table("Tasks")]
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }
        
        [Required]
        [StringLength(50)]
        public string TaskName { get; set; }

        public string TaskDescription { get; set; }

        [Column("Time")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}