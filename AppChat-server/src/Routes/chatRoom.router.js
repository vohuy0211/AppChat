import express from "express";

import chatController from "../Controllers/chatRoom.controller.js";

const chatRouter = express.Router();

chatRouter.get("/getAllChat", chatController.handleGetAllChat);
chatRouter.post("/postChat", chatController.handlePostChat);

export default chatRouter;
