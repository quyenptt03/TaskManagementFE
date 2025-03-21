import TaskTable from "./components/Table";
import Info from "./components/Info";
import { useState } from "react";
import { useGetAllCategories } from "../../api/category/query";
import { useCreateTask } from "../../api/task/query";
import { CreateTaskAPIRequestSchema } from "../../types/task";
import { useGetAllLabels } from "../../api/taskLabel/query";
import { Button } from "../../components";

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
      <div className="p-4 w-full bg-[#FBF8F1]">
        <div className="w-3/4 mx-auto mt-5">
          <Button
            theme="filled"
            className="!w-fit mb-5"
            onClick={() => setOpen(true)}
          >
            + Add task
          </Button>
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
    </div>
  );
};

export default TaskPage;
