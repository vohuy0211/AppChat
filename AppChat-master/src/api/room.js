import axiosClient from "./axiosClient";

export class RoomAPI {
  static createRoom(data) {
    const url = "api/v1/room/creatRoom";
    return axiosClient.post(url, data);
  }
  static createUserRoom(userId, roomId) {
    const url = "api/v1/userRoom/createUserRoom";
    return axiosClient.post(url, userId, roomId);
  }
}
