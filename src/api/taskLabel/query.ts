import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskLabelAPI } from "./query-slice";
import { z } from "zod";
import {
  AssignLabelAPIResponseSchema,
  RemoveLabelAPIResponseSchema,
} from "../../types/taskLabel";
//@ts-ignore
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router";
import toast from "react-hot-toast";

function useGetAllLabels() {
  return useQuery({
    queryKey: ["labels"],
    queryFn: () => {
      return TaskLabelAPI.GetAllLabels();
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useGetAllTaskLabels() {
  return useQuery({
    queryKey: ["task-labels"],
    queryFn: () => {
      return TaskLabelAPI.GetAllTaskLabels();
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useAssignLabel() {
  const queryClient = useQueryClient();
  return useMutation<
    z.infer<typeof AssignLabelAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationFn: (label) => TaskLabelAPI.AssignLabel(label),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // const { message } = res;
      // toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

function useRemoveLabel() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof RemoveLabelAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationFn: ({ taskId, labelId }: { taskId: number; labelId: number }) => {
      return TaskLabelAPI.RemoveLabel({ taskId, labelId });
    },
    onSuccess: (res) => {
      // const { message } = res;
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export { useGetAllLabels, useGetAllTaskLabels, useAssignLabel, useRemoveLabel };
