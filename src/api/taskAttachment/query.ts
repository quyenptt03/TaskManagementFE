import { TaskAttachmentAPI } from "./query-slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//@ts-ignore
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ErrorResponse } from "react-router";
import { z } from "zod";
import {
  DeleteAttachmentAPIResponseSchema,
  UploadAttachmentAPIRequestSchema,
  UploadAttachmentAPIResponseSchema,
} from "../../types/taskAttachment";

function useGetAllAttachments(taskId: number) {
  return useQuery({
    queryKey: ["task-attachments", taskId],
    queryFn: () => {
      console.log({ taskId });
      return TaskAttachmentAPI.GetAll(taskId);
    },
    staleTime: 5 * 60 * 1000,
  });
}

// function useUploadAttachments() {
//   const queryClient = useQueryClient();
//   return useMutation<
//     z.infer<typeof UploadAttachmentAPIResponseSchema>,
//     AxiosError<ErrorResponse>,
//     { taskId: number; files: File[] }
//   >({
//     mutationFn: ({ taskId, files }) => {
//       console.log({ taskId, files });
//       // const formData = new FormData();
//       // files.forEach((file) => formData.append("files", file));
//       return TaskAttachmentAPI.UploadAttachments({ taskId, files });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["task-attachments"] });
//       toast.success("Upload attachments successfully!!!");
//     },
//     onError: (error) => {
//       const errorMessage = error.response?.data.message;
//       toast.error(errorMessage);
//     },
//   });
// }

function useUploadAttachments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskAttachmentAPI.UploadAttachments,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["task-attachments"] });
      toast.success("Upload attachments successfully!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.log({ error });
      toast.error(error.response?.data?.message || "Upload failed.");
    },
  });
}

function useDeleteAttachment() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof DeleteAttachmentAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    number
  >({
    mutationFn: (id) => {
      return TaskAttachmentAPI.DeleteAttachment(id);
    },
    onSuccess: (res) => {
      const { message } = res;
      queryClient.invalidateQueries({ queryKey: ["task-attachments"] });
      toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export { useGetAllAttachments, useUploadAttachments, useDeleteAttachment };
