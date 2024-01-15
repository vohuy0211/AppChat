import express from "express";
import roomController from "../Controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post("/creatRoom" , roomController.handleCreateRoom);
roomRouter.get("/getRoomById" , roomController.handleGetRoomById)

export default roomRouter;