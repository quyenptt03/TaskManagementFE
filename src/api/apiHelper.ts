import { z } from "zod";
import { instanceWithoutInterceptors, instance } from "./axiosClient";
//@ts-ignore
import { AxiosRequestConfig, Method } from "axios";

interface APICallPayload<Request, Response> {
  method: Method;
  path: string;
  requestSchema?: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
  type?: "private" | "public";
}

export function api<Request, Response>({
  type = "private",
  method,
  path,
  requestSchema,
  responseSchema,
}: APICallPayload<Request, Response>) {
  return async (requestData: Request) => {
    if (requestSchema) {
      requestSchema.parse(requestData);
    }

    let url = path;
    let data = null;

    if (requestData) {
      if (method === "GET" || method === "DELETE") {
        url += `${requestData}`;
      } else {
        data = requestData;
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
    };
    const response =
      type === "private"
        ? await instance(config)
        : await instanceWithoutInterceptors(config);

    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error("Safe-Parsing Failed ", result.error);
      throw new Error(result.error.message);
    } else {
      return result.data;
    }
  };
}
