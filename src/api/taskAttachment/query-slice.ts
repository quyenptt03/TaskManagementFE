import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllAPIeRequestSchema,
  GetAllAPIResponseSchema,
  UploadAttachmentAPIRequestSchema,
  UploadAttachmentAPIResponseSchema,
  UploadRequestSchema,
  DeleteAttachmentAPIRequestSchema,
  DeleteAttachmentAPIResponseSchema,
} from "../../types/taskAttachment";
import { z } from "zod";

const GetAllRequest = GetAllAPIeRequestSchema;
const GetAllResponse = GetAllAPIResponseSchema;
const UploadRequest = UploadAttachmentAPIRequestSchema;
const UploadResponse = UploadAttachmentAPIResponseSchema;
const DeleteAttachmentRequest = DeleteAttachmentAPIRequestSchema;
const DeleteAttachmentResponse = DeleteAttachmentAPIResponseSchema;

const GetAll = api<
  z.infer<typeof GetAllRequest>,
  z.infer<typeof GetAllResponse>
>({
  method: "GET",
  path: (taskId) => `${API_ENDPOINT.TASKATTACHMENTS}?taskId=${taskId}`,
  requestSchema: GetAllRequest,
  responseSchema: GetAllResponse,
  type: "public",
});

const UploadAttachments = api<
  z.infer<typeof UploadRequest>,
  // any,
  z.infer<typeof UploadResponse>
>({
  method: "POST",
  path: (data) =>
    `${API_ENDPOINT.TASKATTACHMENTS}/upload-multiple/${data.taskId}`,
  requestSchema: UploadRequest,
  responseSchema: UploadResponse,
  type: "private",
});

const DeleteAttachment = api<
  z.infer<typeof DeleteAttachmentRequest>,
  z.infer<typeof DeleteAttachmentResponse>
>({
  method: "DELETE",
  path: (id) => `${API_ENDPOINT.TASKATTACHMENTS}/${id}`,
  requestSchema: DeleteAttachmentRequest,
  responseSchema: DeleteAttachmentResponse,
  type: "private",
});

export const TaskAttachmentAPI = {
  GetAll,
  UploadAttachments,
  DeleteAttachment,
};
