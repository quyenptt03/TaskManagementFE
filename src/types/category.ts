import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";
import { z, ZodType } from "zod";
import { Task, TaskSchema } from "./task";

export type FormData = {
  title: string;
  description: string;
  categoryId: number;
};

// Refactor FormFieldProps to be reusable with a generic type parameter
export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "title" | "description" | "categoryId";

export type Category = {
  id: number;
  name: string;
  description: string;
  tasks: Array<object> | null;
};

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  tasks: z.array(TaskSchema).nullable(),
});

// export const CreateTaskRequestSchema = z.object({
//   title: z.string(),
//   description: z.string(),
//   categoryId: z.string(),
// });

// export const CreateTaskResponseSchema = TaskSchema;

export const GetAllAPIResponseSchema = z.array(CategorySchema);
