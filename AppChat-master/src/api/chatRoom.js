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
  static getMessagesByIdRoom(id, page = 1) {
    const url = `api/v1/chatRoom/${id}?page=${page}`;
    return axiosClient.get(url)
  }
}

