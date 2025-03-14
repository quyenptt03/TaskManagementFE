import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import { GetAllAPIResponseSchema } from "../../types/taskComment";
import { z } from "zod";

const GetAllRequest = z.void();
const GetAllResponse = GetAllAPIResponseSchema;

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

export const TaskCommentAPI = {
  getAll,
};
