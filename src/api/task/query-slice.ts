import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllAPIResponseSchema,
  GetByUserIdRequestSchema,
  GetByIdAPIRequestSchema,
  GetByIdAPIResponseSchema,
  CreateTaskRequestSchema,
  CreateTaskResponseSchema,
  DeleteAPIResponseSchema,
  DeleteAPIRequestSchema,
} from "../../types/task";
import { z } from "zod";

const GetAllRequest = z.void();
const GetAllResponse = GetAllAPIResponseSchema;
const GetByUserIdRequest = GetByUserIdRequestSchema;
const GetByIdRequest = GetByIdAPIRequestSchema;
const GetByIdResponse = GetByIdAPIResponseSchema;
const CreateTaskRequest = CreateTaskRequestSchema;
const CreateTaskResponse = CreateTaskResponseSchema;
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
    console.log({ userId, filters });
    console.log(typeof filters);
    const p = `${API_ENDPOINT.TASKS}/user/${userId}?${query}`;
    console.log({ p });
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
  DeleteTask,
};
