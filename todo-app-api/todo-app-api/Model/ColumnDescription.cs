using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_app_api.Model
{
    public class ColumnDescription
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public int[] TaskIds { get; set; }
        
    }
}
