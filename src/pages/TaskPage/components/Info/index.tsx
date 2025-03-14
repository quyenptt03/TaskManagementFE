import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  CreateTaskSchema,
  FormData,
  Task,
  TaskSchema,
} from "../../../../types/task";
import { FormField, InputField } from "../../../../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm, UseFormRegister } from "react-hook-form";
import { Button } from "../../../../components";

interface CreateTaskDialogProps {
  data: any;
  open: boolean;
  onClose: () => void;
  onCreate: (task: any) => void;
}

const Info: React.FC<CreateTaskDialogProps> = ({
  open,
  onClose,
  onCreate,
  data,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    categoryId: "",
    isCompleted: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (data: FormData) => {
    console.log("submit form", data);
    // onCreate(task);
    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormField
            type="text"
            placeholder="Title"
            name="title"
            register={register}
            error={errors.title}
          />
          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            error={errors.description}
          />
          {/* <TextField
          fullWidth
          margin="dense"
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
        /> */}
          {/* <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={3}
        /> */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={task.categoryId}
              onChange={handleChange}
              inputRef={register("categoryId").ref}
              error={!!errors.categoryId}
            >
              <MenuItem value="">Choose category</MenuItem>
              {data?.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
              {/* <MenuItem value="1">Work</MenuItem>
            <MenuItem value="2">Study</MenuItem> */}
            </Select>
            {errors.isCompleted && <p>{errors.isCompleted.message}</p>}
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="isCompleted"
              value={task.isCompleted}
              onChange={handleChange}
              inputRef={register("isCompleted").ref}
              error={!!errors.categoryId}
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="false">On going</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
            </Select>
            {errors.isCompleted && <p>{errors.isCompleted.message}</p>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} theme="base">
            Cancel
          </Button>
          <Button theme="filled" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Info;
