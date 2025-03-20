import { z } from "zod";

export type TaskComment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: string;
};

const TaskCommentSchema = z.object({
  id: z.number(),
  taskId: z.number(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
});

export const TaskCommentResponse = z.object({
  id: z.number(),
  taskId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  userId: z.number(),
  email: z.string(),
  userName: z.string(),
});

export const GetAllAPIResponseSchema = z.array(TaskCommentSchema);

export const GetByTaskAPIRequestSchema = z.number();

export const GetCommentsAPIResponseSchema = z.array(TaskCommentResponse);

export const CreateCommentAPIRequestSchema = z.object({
  taskId: z.number(),
  content: z.string(),
});

export const CreateCommentAPIResponseSchema = TaskCommentSchema;

export const DeleteAPIRequestSchema = z.number();

export const DeleteAPIResponseSchema = z.object({
  message: z.string(),
});
