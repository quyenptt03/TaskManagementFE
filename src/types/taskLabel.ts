import { z } from "zod";

export type Label = {
  id: number;
  name: string;
};

export const LabelSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type TaskLabel = {
  taskId: number;
  labelId: number;
};

export const TaskLabelSchema = z.object({
  taskId: z.number(),
  labelId: z.number(),
});

export const GetAllLabelAPIResponseSchema = z.array(LabelSchema);

export const GetAllTaskLabelAPIResponseSchema = z.array(TaskLabelSchema);
