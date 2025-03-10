import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import {
  SignInAPIResponseSchema,
  LoginSchema,
  SignUpAPIResponseSchema,
  SignOutAPIResponseSchema,
} from "../../types/auth";

const SignInRequest = LoginSchema;
const SignInResponse = SignInAPIResponseSchema;
const SignUpRequest = LoginSchema;
const SignUpResponse = SignUpAPIResponseSchema;
const SignOutResponse = SignOutAPIResponseSchema;

const signIn = api({
  method: "POST",
  path: API_ENDPOINT.SIGN_IN,
  requestSchema: SignInRequest,
  responseSchema: SignInResponse,
  type: "public",
});

const signUp = api({
  method: "POST",
  path: API_ENDPOINT.SIGN_UP,
  requestSchema: SignUpRequest,
  responseSchema: SignUpResponse,
  type: "public",
});

const signOut = api({
  method: "POST",
  path: API_ENDPOINT.SIGN_OUT,
  responseSchema: SignOutResponse,
  type: "private",
});

export const AuthAPI = {
  signIn,
  signUp,
  signOut,
};
