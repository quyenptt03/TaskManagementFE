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
import { instance } from "../axiosClient";

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

// const UploadAttachments = api<
//   // { files: z.infer<typeof UploadRequest>["files"] },
//   any,
//   z.infer<typeof UploadResponse>
// >({
//   method: "POST",
//   path: (data) => {
//     console.log({ data });
//     return `${API_ENDPOINT.TASKATTACHMENTS}/upload-multiple/${data.id}`;
//   },
//   requestSchema: UploadRequest.shape.files,
//   responseSchema: UploadResponse,
//   type: "private",
// });
export const UploadAttachments = async ({
  taskId,
  files,
}: {
  taskId: string;
  files: File[];
}) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const response = await instance.post(
    `${API_ENDPOINT.TASKATTACHMENTS}/upload-multiple/${taskId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

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
