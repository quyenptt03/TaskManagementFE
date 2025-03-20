import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllAPIResponseSchema,
  GetByUserIdRequestSchema,
  GetByIdAPIRequestSchema,
  GetByIdAPIResponseSchema,
  CreateTaskAPIRequestSchema,
  CreateTaskAPIResponseSchema,
  UpdateAPIRequestSchema,
  UpdateAPIResponseSchema,
  DeleteAPIResponseSchema,
  DeleteAPIRequestSchema,
} from "../../types/task";
import { z } from "zod";

const GetAllRequest = z.void();
const GetAllResponse = GetAllAPIResponseSchema;
const GetByUserIdRequest = GetByUserIdRequestSchema;
const GetByIdRequest = GetByIdAPIRequestSchema;
const GetByIdResponse = GetByIdAPIResponseSchema;
const CreateTaskRequest = CreateTaskAPIRequestSchema;
const CreateTaskResponse = CreateTaskAPIResponseSchema;
const UpdateTaskRequest = UpdateAPIRequestSchema;
const UpdateTaskResponse = UpdateAPIResponseSchema;
const DeleteTaskRequest = DeleteAPIRequestSchema;
const DeleteTaskResponse = DeleteAPIResponseSchema;

const getAll = api<
  z.infer<typeof GetAllRequest>,
  z.infer<typeof GetAllResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASKS,
  requestSchema: GetAllRequest,
  responseSchema: GetAllResponse,
  type: "public",
});

const GetByUserId = api<
  z.infer<typeof GetByUserIdRequest>,
  z.infer<typeof GetAllResponse>
>({
  method: "GET",
  path: (params) => {
    const { userId, ...filters } = params;
    const query = new URLSearchParams(filters).toString();
    const p = `${API_ENDPOINT.TASKS}/user/${userId}?${query}`;
    return p;
  },
  requestSchema: GetByUserIdRequest,
  responseSchema: GetAllResponse,
  type: "private",
});

const GetById = api<
  z.infer<typeof GetByIdRequest>,
  z.infer<typeof GetByIdResponse>
>({
  method: "GET",
  path: (taskId) => `${API_ENDPOINT.TASKS}/${taskId}`,
  requestSchema: GetByIdRequest,
  responseSchema: GetByIdResponse,
  type: "private",
});

const CreateTask = api<
  z.infer<typeof CreateTaskRequest>,
  z.infer<typeof CreateTaskResponse>
>({
  method: "POST",
  path: API_ENDPOINT.TASKS,
  requestSchema: CreateTaskRequest,
  responseSchema: CreateTaskResponse,
  type: "private",
});

const UpdateTask = api<
  z.infer<typeof UpdateTaskRequest>,
  z.infer<typeof UpdateTaskResponse>
>({
  method: "PUT",
  path: (task) => `${API_ENDPOINT.TASKS}/${task.id}`,
  requestSchema: UpdateTaskRequest,
  responseSchema: UpdateTaskResponse,
  type: "private",
});

const DeleteTask = api<
  z.infer<typeof DeleteTaskRequest>,
  z.infer<typeof DeleteTaskResponse>
>({
  method: "DELETE",
  path: (taskId) => `${API_ENDPOINT.TASKS}/${taskId}`,
  requestSchema: DeleteTaskRequest,
  responseSchema: DeleteTaskResponse,
  type: "private",
});

export const TaskAPI = {
  getAll,
  GetByUserId,
  GetById,
  CreateTask,
  UpdateTask,
  DeleteTask,
};
