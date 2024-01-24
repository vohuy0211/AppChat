import express from "express";
import userRoomController from "../Controllers/userRoom.controller.js";

const userRoomRouter = express.Router();

userRoomRouter.post("/createUserRoom", userRoomController.handleCreate);
userRoomRouter.get("/getAllUserRoom", userRoomController.handleGetUserRoom);

export default userRoomRouter;
