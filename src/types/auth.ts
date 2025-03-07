import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "email" | "password" | "confirmPassword";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const RegisterSchema: ZodType<FormData> = z
  .object({
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(50, { message: "Password is too long" })
      .regex(passwordValidation, {
        message:
          "Your password at least 8 characters, must contain at least 1 uppercase letter, 1 number and 1 special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema: ZodType<FormData> = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(50, { message: "Password is too long" }),
});

export const SignInAPIResponseSchema = z.object({
  data: z.string(), // Chấp nhận kiểu string thay vì object
  status: z.number(),
  statusText: z.string(),
  headers: z.object({}),
  config: z.object({}),
  request: z.any(),
});
