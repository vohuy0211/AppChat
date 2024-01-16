import express from "express";
import roomController from "../Controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post("/creatRoom" , roomController.handleCreateRoom);
roomRouter.get("/:userId/:receiverId" , roomController.handleGetRoomById);

export default roomRouter;