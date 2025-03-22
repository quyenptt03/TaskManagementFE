import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllLabelAPIResponseSchema,
  GetAllTaskLabelAPIResponseSchema,
  AssignLabelAPIRequestSchema,
  AssignLabelAPIResponseSchema,
  RemoveLabelAPIRequestSchema,
  RemoveLabelAPIResponseSchema,
} from "../../types/taskLabel";
import { z } from "zod";

const GetAllLabelRequest = z.void();
const GetAllLabelResponse = GetAllLabelAPIResponseSchema;
const GetAllTaskLabelRequest = z.void();
const GetAllTaskLabelResponse = GetAllTaskLabelAPIResponseSchema;
const AssignLabelRequest = AssignLabelAPIRequestSchema;
const AssignLabelResponse = AssignLabelAPIResponseSchema;
const RemoveLabelRequest = RemoveLabelAPIRequestSchema;
const RemoveLabelResponse = RemoveLabelAPIResponseSchema;

const GetAllLabels = api<
  z.infer<typeof GetAllLabelRequest>,
  z.infer<typeof GetAllLabelResponse>
>({
  method: "GET",
  path: API_ENDPOINT.LABELS,
  requestSchema: GetAllLabelRequest,
  responseSchema: GetAllLabelResponse,
  type: "public",
});

const GetAllTaskLabels = api<
  z.infer<typeof GetAllTaskLabelRequest>,
  z.infer<typeof GetAllTaskLabelResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASKLABELS,
  requestSchema: GetAllTaskLabelRequest,
  responseSchema: GetAllTaskLabelResponse,
  type: "public",
});

const AssignLabel = api<
  z.infer<typeof AssignLabelRequest>,
  z.infer<typeof AssignLabelResponse>
>({
  method: "POST",
  path: `${API_ENDPOINT.TASKLABELS}/assign`,
  requestSchema: AssignLabelRequest,
  responseSchema: AssignLabelResponse,
  type: "private",
});

const RemoveLabel = api<
  z.infer<typeof RemoveLabelRequest>,
  z.infer<typeof RemoveLabelResponse>
>({
  method: "DELETE",
  path: ({ taskId, labelId }) =>
    `${API_ENDPOINT.TASKLABELS}/remove/${taskId}/${labelId}`,
  requestSchema: RemoveLabelRequest,
  responseSchema: RemoveLabelResponse,
  type: "private",
});

export const TaskLabelAPI = {
  GetAllLabels,
  GetAllTaskLabels,
  AssignLabel,
  RemoveLabel,
};
