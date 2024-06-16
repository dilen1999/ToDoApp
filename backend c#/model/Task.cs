using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend_c_.model
{
    [Table("Tasks")]
    public class Task
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
