import express from "express";
import userRoomController from "../Controllers/userRoom.controller.js";

const userRoomRouter = express.Router();

userRoomRouter.post("/createUserRoom", userRoomController.handleCreate);
userRoomRouter.get("/getUserRoomById/:id", userRoomController.handleGetUserRoom);

export default userRoomRouter;
