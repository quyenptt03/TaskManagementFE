import { z } from "zod";

export type TaskComment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdAt: string;
};

export const TaskCommentSchema = z.object({
  id: z.number(),
  taskId: z.number(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
});

export const GetAllAPIResponseSchema = z.array(TaskCommentSchema);
