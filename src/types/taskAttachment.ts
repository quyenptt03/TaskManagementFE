import { z } from "zod";

export type Attachment = {
  id: number;
  name: string;
};

export const AttachmentSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const AttachmentResponseSchema = z.object({
  id: z.number(),
  taskId: z.number(),
  fileName: z.string(),
  fileUrl: z.string(),
  uploadedAt: z.string(),
  task: z.any().optional(),
});

export const GetAllAPIeRequestSchema = z.number();

export const GetAllAPIResponseSchema = z.array(AttachmentResponseSchema);

export const UploadAttachmentAPIRequestSchema = z.object({
  taskId: z.number(),
  files: z.any().refine((val) => val.length > 0, "File is required"),
});

export const UploadRequestSchema = z.array(
  z.any().refine((val) => val.length > 0, "File is required")
);

export const UploadAttachmentAPIResponseSchema = z.object({
  message: z.string(),
});

export const DeleteAttachmentAPIRequestSchema = z.number();

export const DeleteAttachmentAPIResponseSchema = z.object({
  message: z.string(),
});
