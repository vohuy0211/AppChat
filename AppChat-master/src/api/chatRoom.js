import axiosClient from "./axiosClient";

export class ChatAPI {
  static sendMessage(data) {
    const url = "api/v1/chatRoom/postChat";
    return axiosClient.post(url, data);
  }
  static getRoomById(userId, receiverId) {
    const url = `api/v1/room/${userId}/${receiverId}`;
    return axiosClient.get(url)
  }
  static getMessagesByIdRoom(id) {
    const url = `api/v1/chatRoom/${id}`;
    return axiosClient.get(url)
  }
}

