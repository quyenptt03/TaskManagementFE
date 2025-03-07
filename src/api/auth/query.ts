import { z } from "zod";
//@ts-ignore
import { AxiosError } from "axios";
import { useUserStore } from "../../store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInAPI } from "./query-slice";
import { SignInAPIResponseSchema, FormData } from "../../types/auth";
// import { toast } from "sonner";

interface ErrorResponse {
  message: string;
}

export function useSignIn() {
  // const { setCredentials } = useUserStore();
  return useMutation<
    // z.infer<typeof SignInAPIResponseSchema>,
    unknown,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (user) => SignInAPI.signIn(user),
    onSuccess: (data) => {
      // const { payload, message } = data;
      console.log({ data });
      //   setCredentials({
      //     accessToken: payload.accessToken,
      //   });

      // console.log({ message });
      // toast.success(message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;

      //   toast.error(errorMessage);
      console.log({ error: errorMessage });
    },
  });
}
