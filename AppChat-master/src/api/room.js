import axiosClient from "./axiosClient";

export class RoomAPI {
    static createRoom(data) {
      const url = "api/v1/room/creatRoom";
      return axiosClient.post(url, data);
    }
  }
  