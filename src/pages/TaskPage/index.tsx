import TaskTable from "./components/Table";
import Info from "./components/Info";
import { useState } from "react";
import { useGetAllCategories } from "../../api/category/query";

const TaskPage = () => {
  const getAllCategories = useGetAllCategories();
  const [open, setOpen] = useState(false);

  const handleCreateTask = async (newTask: any) => {
    // try {
    //   const response = await fetch("https://localhost:7079/api/tasks", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newTask),
    //   });

    //   if (response.ok) {
    //     console.log("Task created!");
    //   } else {
    //     console.error("Lỗi khi tạo task");
    //   }
    // } catch (error) {
    //   console.error("Lỗi kết nối API", error);
    // }
    console.log({ newTask });
  };

  return (
    <div>
      <div className="p-4 w-full">
        <button onClick={() => setOpen(true)}>Add task</button>
        <Info
          data={getAllCategories.data}
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
