import axiosClient from "./axiosClient";

const authApi = {
  register(data: object) {
    const url = "/api/users/register";
    return axiosClient.post(url, data);
  },
  login(data: object) {
    const url = "/api/users/login";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/api/users/logout";
    return axiosClient.get(url);
  },
};

export default authApi;
