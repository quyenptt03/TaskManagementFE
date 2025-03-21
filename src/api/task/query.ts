import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTaskAPIResponseSchema,
  DeleteAPIResponseSchema,
  UpdateAPIResponseSchema,
} from "../../types/task";
import { TaskAPI } from "./query-slice";
//@ts-ignore
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ErrorResponse } from "react-router";
import { z } from "zod";
import { TaskLabelAPI } from "../taskLabel/query-slice";

function useGetAllTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return TaskAPI.getAll();
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useGetByUserId(userId: number, filters: any) {
  return useQuery({
    queryKey: ["tasks", userId, filters],
    queryFn: () => TaskAPI.GetByUserId({ userId, ...filters }),
    staleTime: 5 * 60 * 1000,
  });
}

function useGetTask(taskId: number) {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => TaskAPI.GetById(taskId),
    staleTime: 5 * 60 * 1000,
  });
}

function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation<
    z.infer<typeof CreateTaskAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationFn: async (task) => {
      const taskInfo = await TaskAPI.CreateTask(task);
      if (task.labels?.length) {
        await Promise.all(
          task.labels.map((label: any) =>
            TaskLabelAPI.AssignLabel({ taskId: taskInfo.id, labelId: label.id })
          )
        );
      }
      return taskInfo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Created task successfully!!!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof UpdateAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationFn: (task) => {
      return TaskAPI.UpdateTask(task);
    },
    onSuccess: (res) => {
      const { message } = res;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof DeleteAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    number
  >({
    mutationFn: (taskId) => {
      return TaskAPI.DeleteTask(taskId);
    },
    onSuccess: (res) => {
      const { message } = res;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export {
  useCreateTask,
  useDeleteTask,
  useGetAllTasks,
  useGetByUserId,
  useGetTask,
  useUpdateTask,
};
