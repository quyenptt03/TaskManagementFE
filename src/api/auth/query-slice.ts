import { api } from "../apiHelper";
import { API_ENDPOINT } from "../endpoint_constants";
import { SignInAPIResponseSchema, LoginSchema } from "../../types/auth";

const SignInRequest = LoginSchema;

const SignInResponse = SignInAPIResponseSchema;

const signIn = api({
  method: "POST",
  path: API_ENDPOINT.SIGN_IN,
  requestSchema: SignInRequest,
  responseSchema: SignInResponse,
  type: "public",
});

export const SignInAPI = {
  signIn,
};
