import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  title: string;
  description: string;
  categoryId: number;
  isCompleted: boolean;
};

// export type FormFieldProps = {
//   type: string;
//   placeholder: string;
//   name: ValidFieldNames;
//   register: UseFormRegister<FormData>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };
export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = any;

export type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
  categoryId: number;
  createdAt: string;
};

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  userId: z.number(),
  categoryId: z.number(),
  createdAt: z.string(),
});

export const CreateTaskSchema: ZodType<FormData> = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required" })
    .max(50, { message: "Title is too long" }),
  description: z.string().max(255, { message: "Description is too long" }),
  categoryId: z.number(),
  isCompleted: z.boolean(),
});

export const GetByUserIdRequestSchema = z.object({
  userId: z.number(),
  categoryId: z.string(),
  labelId: z.string(),
  isCompleted: z.string(),
});

export const TaskResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
  userId: z.number(),
  categoryId: z.number(),
  createdAt: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
  }),
  labels: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export const CreateTaskRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoryId: z.string(),
});

export const CreateTaskResponseSchema = TaskSchema;

export const GetAllAPIResponseSchema = z.array(TaskResponseSchema);

export const GetByIdAPIRequestSchema = z.number();

export const GetByIdAPIResponseSchema = TaskResponseSchema;

export const DeleteAPIRequestSchema = z.number();

export const DeleteAPIResponseSchema = z.object({
  message: z.string(),
});
