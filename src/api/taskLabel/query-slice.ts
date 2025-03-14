import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  GetAllLabelAPIResponseSchema,
  GetAllTaskLabelAPIResponseSchema,
} from "../../types/taskLabel";
import { z } from "zod";

const GetAllLabelRequest = z.void();
const GetAllLabelResponse = GetAllLabelAPIResponseSchema;
const GetAllTaskLabelRequest = z.void();
const GetAllTaskLabelResponse = GetAllTaskLabelAPIResponseSchema;

const getAllLabels = api<
  z.infer<typeof GetAllLabelRequest>,
  z.infer<typeof GetAllLabelResponse>
>({
  method: "GET",
  path: API_ENDPOINT.LABELS,
  requestSchema: GetAllLabelRequest,
  responseSchema: GetAllLabelResponse,
  type: "public",
});

const getAllTaskLabels = api<
  z.infer<typeof GetAllTaskLabelRequest>,
  z.infer<typeof GetAllTaskLabelResponse>
>({
  method: "GET",
  path: API_ENDPOINT.TASKLABELS,
  requestSchema: GetAllTaskLabelRequest,
  responseSchema: GetAllTaskLabelResponse,
  type: "public",
});

export const TaskLabelAPI = {
  getAllLabels,
  getAllTaskLabels,
};
