import {
  Checkbox,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import {
  useGetByUserId,
  useDeleteTask,
  useGetTask,
} from "../../../../api/task/query";
import { useEffect, useState } from "react";
import { Task } from "../../../../types/task";
import { useUserStore } from "../../../../store/useUserStore";
import { useGetAllCategories } from "../../../../api/category/query";
import {
  useGetAllLabels,
  useGetAllTaskLabels,
} from "../../../../api/taskLabel/query";
import { useGetAllTaskComments } from "../../../../api/taskComment/query";
import { ConfirmDialog } from "../../../../components";

const TaskTable = () => {
  const { user } = useUserStore();
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    categoryId: "",
    labelId: "",
    isCompleted: "",
  });
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const deleteTask = useDeleteTask();
  // const { data: userTask } = useGetTask(3);
  // console.log({ userTask });

  //@ts-ignore
  const userId = user.user?.id || 0;
  const { data: tasks, refetch } = useGetByUserId(userId, filters);
  // const getAllCategories = useGetAllCategories();
  // const getAllLabel = useGetAllLabels();
  // const getAllTaskLebals = useGetAllTaskLabels();
  // const getAllComments = useGetAllTaskComments();
  // console.log({
  //   categories: getAllCategories.data,
  //   labels: getAllLabel.data,
  //   taskLabels: getAllTaskLebals.data,
  //   taskComments: getAllComments.data,
  // });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  if (tasks === undefined) return <div>Loading...</div>;

  const sortedTasks = [...tasks].sort((a, b) => {
    const valA = a[orderBy as keyof Task];
    const valB = b[orderBy as keyof Task];

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log({ isAsc, property, order, orderBy });
  };

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleFilterChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name as string]: value }));
  };

  const openDeleteDialog = (taskId: number) => {
    setTaskIdToDelete(taskId);
    setOpen(true);
  };

  const handleDelete = () => {
    if (taskIdToDelete !== null) {
      deleteTask.mutate(taskIdToDelete);
      setTaskIdToDelete(null);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="p-4 w-full">
        <TableContainer component={Paper} className="w-3/4 mx-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < tasks.length
                    }
                    checked={selected.length === tasks.length}
                    onChange={() =>
                      setSelected(
                        selected.length === tasks.length
                          ? []
                          : tasks.map((t) => t.id)
                      )
                    }
                  />
                </TableCell>
                <TableCell sx={{ width: "150px", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: "50px", fontWeight: "bold" }}>
                  <Select
                    name="isCompleted"
                    value={filters.isCompleted}
                    onChange={(e) =>
                      handleFilterChange(
                        e as React.ChangeEvent<{ name: string; value: string }>
                      )
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Status</MenuItem>
                    <MenuItem value="true">Completed</MenuItem>
                    <MenuItem value="false">Not Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ width: "80px", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "categoryId"}
                    direction={orderBy === "categoryId" ? order : "asc"}
                    onClick={() => handleSort("categoryId")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: "80px", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "createdAt"}
                    direction={orderBy === "createdAt" ? order : "asc"}
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: "80px", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "labelId"}
                    direction={orderBy === "labelId" ? order : "asc"}
                    onClick={() => handleSort("labelId")}
                  >
                    Label
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: "80px", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks?.map((task, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(task.id)}
                      onChange={() => handleSelect(task.id)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  >
                    <Typography fontWeight="bold">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {task.isCompleted ? "✅ Completed" : "❌ On going"}
                  </TableCell>
                  <TableCell>{task.category.name}</TableCell>
                  <TableCell>
                    {new Date(task.createdAt).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    {task.labels.map((label, index) => (
                      <p className="m-1 border border-black" key={index}>
                        {label.name}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => openDeleteDialog(task.id)}>
                      ❌
                    </button>
                    <ConfirmDialog
                      open={open}
                      title="Delete Confirmation"
                      message="Are you sure you want to delete this task?"
                      onConfirm={() => handleDelete()}
                      onCancel={() => setOpen(false)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TaskTable;
