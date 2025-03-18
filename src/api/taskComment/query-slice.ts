import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllAPIResponseSchema,
  GetByTaskAPIRequestSchema,
  GetCommentsAPIResponseSchema,
  CreateCommentAPIRequestSchema,
  CreateCommentAPIResponseSchema,
  DeleteAPIRequestSchema,
  DeleteAPIResponseSchema,
} from "../../types/taskComment";
import { z } from "zod";

const GetAllRequest = z.void();
const GetAllResponse = GetAllAPIResponseSchema;
const GetByTaskRequest = GetByTaskAPIRequestSchema;
const GetByTaskResponse = GetCommentsAPIResponseSchema;
const CreateCommentRequest = CreateCommentAPIRequestSchema;
const CreateCommentResponse = CreateCommentAPIResponseSchema;
const DeleteCommentRequest = DeleteAPIRequestSchema;
const DeleteCommentResponse = DeleteAPIResponseSchema;

const getAll = api<
  z.infer<typeof GetAllRequest>,
  z.infer<typeof GetAllResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASKCOMMENTS,
  requestSchema: GetAllRequest,
  responseSchema: GetAllResponse,
  type: "public",
});

const GetByTask = api<
  z.infer<typeof GetByTaskRequest>,
  z.infer<typeof GetByTaskResponse>
>({
  method: "GET",
  path: (taskId) => `${API_ENDPOINT.TASKCOMMENTS}/task/${taskId}`,
  requestSchema: GetByTaskRequest,
  responseSchema: GetByTaskResponse,
  type: "public",
});

const Create = api<
  z.infer<typeof CreateCommentRequest>,
  z.infer<typeof CreateCommentResponse>
>({
  method: "POST",
  path: API_ENDPOINT.TASKCOMMENTS,
  requestSchema: CreateCommentRequest,
  responseSchema: CreateCommentResponse,
  type: "private",
});

const Delete = api<
  z.infer<typeof DeleteCommentRequest>,
  z.infer<typeof DeleteCommentResponse>
>({
  method: "DELETE",
  path: (commentId) => `${API_ENDPOINT.TASKCOMMENTS}/${commentId}`,
  requestSchema: DeleteCommentRequest,
  responseSchema: DeleteCommentResponse,
  type: "private",
});

export const TaskCommentAPI = {
  getAll,
  GetByTask,
  Create,
  Delete,
};
