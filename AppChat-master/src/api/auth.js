import axiosClient from "./axiosClient";

export class AuthAPI {
  static registerData(data) {
    const url = "api/v1/user/register";
    return axiosClient.post(url, data);
  }
  static loginData(data) {
    const url = "api/v1/user/login";
    return axiosClient.post(url, data);
  }
  static getAllUser(data) {
    const url = "api/v1/user/getAllUser";
    return axiosClient.get(url, data);
  }
  static getUserById(id) {
    const url = `api/v1/user/getUser/${id}`;
    return axiosClient.get(url);
  }
}
