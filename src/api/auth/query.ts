import { z } from "zod";
//@ts-ignore
import { AxiosError } from "axios";
import { useUserStore } from "../../store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "./query-slice";
import {
  SignInAPIResponseSchema,
  FormData,
  SignUpAPIResponseSchema,
  SignOutAPIResponseSchema,
} from "../../types/auth";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

interface ErrorResponse {
  message: string;
}

export function useSignIn() {
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();
  return useMutation<
    z.infer<typeof SignInAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (user) => AuthAPI.signIn(user),
    onSuccess: (res) => {
      const { data, message, accessToken } = res;
      setCredentials({
        user: data,
      });

      Cookies.set("token", accessToken, { expires: 1 });

      toast.success(message);
      navigate("/tasks");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export function useSignUp() {
  const navigate = useNavigate();
  return useMutation<
    z.infer<typeof SignUpAPIResponseSchema>,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (user) => AuthAPI.signUp(user),
    onSuccess: (res) => {
      const { message } = res;
      toast.success(message);
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}

export function useSignOut() {
  const navigate = useNavigate();
  const { removeCredentials } = useUserStore();
  return useMutation<
    z.infer<typeof SignOutAPIResponseSchema>,
    AxiosError<ErrorResponse>
  >({
    mutationFn: (user) => AuthAPI.signOut(user),
    onSuccess: (res) => {
      const { message } = res;

      removeCredentials();
      Cookies.remove("token");
      toast.success(message);
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage);
    },
  });
}
