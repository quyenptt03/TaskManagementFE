import {
  Checkbox,
  Chip,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllCategories } from "../../../../api/category/query";
import { useDeleteTask, useGetByUserId } from "../../../../api/task/query";
import { ConfirmDialog } from "../../../../components";
import { useUserStore } from "../../../../store/useUserStore";
import { Task } from "../../../../types/task";
import Info from "../Info";
import { useGetAllLabels } from "../../../../api/taskLabel/query";
import { Visibility, Edit, Clear } from "@mui/icons-material";
import TaskDetails from "../../../../components/Details";

const TaskTable = () => {
  const { user } = useUserStore();
  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    categoryId: "",
    labelId: "",
    isCompleted: "",
  });
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [openView, setOpenView] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);

  const deleteTask = useDeleteTask();

  //@ts-ignore
  const userId = user.user?.id || 0;
  const {
    data: tasks,
    refetch,
    isLoading: isTasksLoading,
  } = useGetByUserId(userId, filters);

  const getAllCategories = useGetAllCategories();
  const getAllLabels = useGetAllLabels();

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
    setOpenConfirm(true);
  };

  const handleDelete = () => {
    if (taskIdToDelete !== null) {
      deleteTask.mutate(taskIdToDelete);
      setTaskIdToDelete(null);
    }
    setOpenConfirm(false);
  };

  const handleUpdate = (taskId: number) => {
    const editTask = tasks.find((task) => task.id === taskId);
    if (editTask) {
      setEditTask(editTask);
      setOpenEdit(true);
    }
  };

  const handleViewDetail = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setViewTask(task);
      setOpenView(true);
    }
  };

  return (
    <div>
      <div className="w-full">
        <TableContainer component={Paper} className="w-full mx-auto">
          <Table className="border-gray-200 border border-solid shadow-none rounded-lg">
            <TableHead className="shadow-none">
              <TableRow className="shadow-none">
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
                <TableCell sx={{ width: "250px", fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Task
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ width: "2px", fontWeight: "bold" }}>
                  <Select
                    name="isCompleted"
                    value={filters.isCompleted}
                    sx={{
                      fontWeight: 600,
                    }}
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
                <TableCell
                  sx={{
                    width: "80px",
                    fontWeight: "bold",
                  }}
                >
                  <Select
                    name="categoryId"
                    value={filters.categoryId}
                    sx={{
                      fontWeight: 600,
                    }}
                    onChange={(e) =>
                      handleFilterChange(
                        e as React.ChangeEvent<{ name: string; value: string }>
                      )
                    }
                    displayEmpty
                  >
                    <MenuItem value="">Category</MenuItem>
                    {getAllCategories?.data?.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ width: "50px", fontWeight: "bold" }}>
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
                <TableCell sx={{ width: "50px", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="shadow-none">
              {isTasksLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="50%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="50%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="50%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="50%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={20}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : sortedTasks?.map((task, index) => (
                    <TableRow
                      key={index}
                      className={`shadow-none ${
                        task.isCompleted ? "bg-[#d9e7f33d]" : "bg-white"
                      }`}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.includes(task.id)}
                          onChange={() => handleSelect(task.id)}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ wordBreak: "break-word", whiteSpace: "normal" }}
                      >
                        <Typography fontWeight="500">
                          {task.title.length > 20
                            ? `${task.title.slice(0, 20)}...`
                            : task.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {task.description.length > 25
                            ? `${task.description.slice(0, 25)}...`
                            : task.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {task.isCompleted ? (
                          <span className="text-success-dark font-medium">
                            Completed
                          </span>
                        ) : (
                          <span className="text-error-dark font-medium">
                            In progress
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{task.category.name}</TableCell>
                      <TableCell>
                        {new Date(task.createdAt).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell>
                        {task.labels.map((label, index) => (
                          <Chip
                            key={index}
                            label={label.name}
                            style={{
                              backgroundColor: "#ebebeb",
                              color: "black",
                              marginRight: "5px",
                              borderRadius: "8px",
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          <div className="h-full mr-3">
                            <button
                              className="h-full"
                              onClick={() => handleViewDetail(task.id)}
                            >
                              <Visibility />
                            </button>
                          </div>
                          <div className="h-full mr-3">
                            <button
                              className="h-full"
                              onClick={() => handleUpdate(task.id)}
                            >
                              <Edit />
                            </button>
                          </div>
                          <div className="h-full">
                            <button
                              className="h-full"
                              onClick={() => openDeleteDialog(task.id)}
                            >
                              <Clear style={{ color: "red" }} />
                            </button>
                            <ConfirmDialog
                              open={openConfirm}
                              title="Delete Confirmation"
                              message="Are you sure you want to delete this task?"
                              onConfirm={() => handleDelete()}
                              onCancel={() => setOpenConfirm(false)}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Info
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onUpdate={handleUpdate}
        task={editTask}
        data={{ categories: getAllCategories.data, labels: getAllLabels.data }}
      />
      {/* 
      <Info
        open={openView}
        onClose={() => setOpenView(false)}
        onView={handleViewDetail}
        task={viewTask}
        data={{ categories: getAllCategories.data, labels: getAllLabels.data }}
      /> */}

      <TaskDetails
        open={openView}
        onClose={() => setOpenView(false)}
        onView={handleViewDetail}
        task={viewTask}
        data={{ categories: getAllCategories.data, labels: getAllLabels.data }}
      />
    </div>
  );
};

export default TaskTable;
