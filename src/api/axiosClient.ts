//@ts-ignore
import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";

export const URL = "https://localhost:7079";
const baseConfig: CreateAxiosDefaults = {
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const instanceWithoutInterceptors = axios.create(baseConfig);

instanceWithoutInterceptors.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instanceWithoutInterceptors.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log({ error });
    const { config, status, data } = error.response;
    if (
      (config.url === "/api/users/register" && status === 400) ||
      (config.url === "/api/users/login" && status === 401)
    ) {
      const newError = data.msg;
      throw new Error(newError);
    }
    return Promise.reject(error);
  }
);

const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("token");

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log({ error });
    const { config, status, data } = error.response;
    if (
      (config.url === "/api/users/register" && status === 400) ||
      (config.url === "/api/users/login" && status === 401)
    ) {
      const newError = data.msg;
      throw new Error(newError);
    }
    return Promise.reject(error);
  }
);

export { instance, instanceWithoutInterceptors };
