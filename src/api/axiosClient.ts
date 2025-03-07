import axios from "axios";
// import { useUserStore } from "../store/useUserStore";

export const URL = "https://localhost:7079";

const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    console.log({ response });
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

export default axiosClient;
