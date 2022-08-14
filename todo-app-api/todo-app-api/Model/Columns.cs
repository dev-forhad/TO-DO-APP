using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_app_api.Model
{
    public class Columns
    {
        public Columns()
        {
            ColumnsInfo = GenerateColumnList();
            Tasks = GetTasks();
        }
        public List<ColumnDescription> ColumnsInfo { get; set; }
        public List<Tasks> Tasks { get; set; }


        public List<Tasks> GetTasks()
        {
            List<Tasks> tasks = new List<Tasks>();
            tasks.Add(new Tasks
            {
                Id = 1,
                Content = "Task 1"
            });
            tasks.Add(new Tasks
            {
                Id = 2,
                Content = "Task 2"
            });
            tasks.Add(new Tasks
            {
                Id = 3,
                Content = "Task 3"
            });
            tasks.Add(new Tasks
            {
                Id = 4,
                Content = "Task 4"
            });
            tasks.Add(new Tasks
            {
                Id = 5,
                Content = "Task 5"
            });
            tasks.Add(new Tasks
            {
                Id = 6,
                Content = "Task 6"
            });
            return tasks;
        }

        public List<ColumnDescription> GenerateColumnList()
        {
            List<ColumnDescription> data = new List<ColumnDescription>();
            data.Add(new ColumnDescription
            {
                Id = "column-1",
                Title = "TO-DO",
                TaskIds = new int[] { 1, 2, 3, 4, 5, 6 }
            });
            data.Add(new ColumnDescription
            {
                Id = "column-2",
                Title = "IN-PROGRESS",
                TaskIds = new int[] { }
            });
            data.Add(new ColumnDescription
            {
                Id = "column-3",
                Title = "COMPLETED",
                TaskIds = new int[] { }
            });

            return data;
        }
    }

    
}
