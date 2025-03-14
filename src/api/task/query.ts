import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskAPI } from "./query-slice";
import { DeleteAPIResponseSchema } from "../../types/task";
//@ts-ignore
import { AxiosError } from "axios";
import { z } from "zod";
import { ErrorResponse } from "react-router";
import { toast } from "react-hot-toast";

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

export { useGetAllTasks, useGetByUserId, useGetTask, useDeleteTask };
