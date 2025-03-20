import { z } from "zod";
import { instanceWithoutInterceptors, instance } from "./axiosClient";
//@ts-ignore
import { AxiosRequestConfig, Method } from "axios";

interface APICallPayload<Request, Response> {
  method: Method;
  path: string | ((params: Request) => string);
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
    let url = typeof path === "function" ? path(requestData) : path;

    // let url = path;
    let data = null;

    if (requestData) {
      if (method === "POST" || method === "PUT") {
        data = requestData;
      }
    }
    // if (requestData) {
    //   if (method === "DELETE") {
    //     url += `${requestData}`;
    //   } else {
    //     data = requestData;
    //   }
    // }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
    };
    const response =
      type === "private"
        ? await instance(config)
        : await instanceWithoutInterceptors(config);
    console.log({ response, config, requestData });

    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error("Safe-Parsing Failed ", result.error);
      throw new Error(result.error.message);
    } else {
      return result.data;
    }
  };
}
