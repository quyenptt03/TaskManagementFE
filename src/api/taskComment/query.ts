import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskCommentAPI } from "./query-slice";
import { z } from "zod";
import {
  CreateCommentAPIResponseSchema,
  DeleteAPIResponseSchema,
} from "../../types/taskComment";
//@ts-ignore
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router";
import toast from "react-hot-toast";

function useGetAllTaskComments() {
  return useQuery({
    queryKey: ["task-comments"],
    queryFn: () => {
      return TaskCommentAPI.getAll();
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useGetByTask(taskId: number) {
  return useQuery({
    queryKey: ["task-comments", taskId],
    queryFn: () => TaskCommentAPI.GetByTask(taskId),
    staleTime: 5 * 60 * 1000,
  });
}

function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation<
    z.infer<typeof CreateCommentAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationFn: (comment) => TaskCommentAPI.Create(comment),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["task-comments"] });
      toast.success("Created task successfully!!!");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof DeleteAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    number
  >({
    mutationFn: (commentId) => {
      return TaskCommentAPI.Delete(commentId);
    },
    onSuccess: (res) => {
      const { message } = res;
      queryClient.invalidateQueries({ queryKey: ["task-comments"] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export {
  useGetAllTaskComments,
  useGetByTask,
  useCreateComment,
  useDeleteComment,
};
