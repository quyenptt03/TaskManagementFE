import TaskTable from "./components/Table";
import Info from "./components/Info";
import { useState } from "react";
import { useGetAllCategories } from "../../api/category/query";
import { useCreateTask } from "../../api/task/query";
import { CreateTaskAPIRequestSchema } from "../../types/task";
import { useGetAllLabels } from "../../api/taskLabel/query";

const TaskPage = () => {
  const getAllCategories = useGetAllCategories();
  const getAllLabels = useGetAllLabels();
  const [open, setOpen] = useState(false);
  const createTask = useCreateTask();

  const handleCreateTask = async (
    newTask: typeof CreateTaskAPIRequestSchema
  ) => {
    const result = await createTask.mutateAsync(newTask);
    console.log({ result });
  };

  return (
    <div>
      <div className="p-4 w-full">
        <button onClick={() => setOpen(true)}>Add task</button>
        <Info
          data={{
            categories: getAllCategories.data,
            labels: getAllLabels.data,
          }}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreateTask}
        ></Info>
        <TaskTable />
      </div>
    </div>
  );
};

export default TaskPage;
