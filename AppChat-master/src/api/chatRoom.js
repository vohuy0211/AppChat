import axiosClient from "./axiosClient";

export class ChatAPI {
  static sendMessage(data) {
    const url = "api/v1/chatRoom/postChat";
    return axiosClient.post(url, data);
  }
  static getAllMessage(data) {{
    const url = "api/v1/chatRoom/getAllChat";
    return axiosClient.get(url, data);
  }}
}