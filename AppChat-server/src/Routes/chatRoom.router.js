import express from "express";

import chatController from "../Controllers/chatRoom.controller.js";

const chatRouter = express.Router();

chatRouter.post("/postChat", chatController.handlePostChat);
chatRouter.get("/:roomId" , chatController.handleGetMessagesById)

export default chatRouter;
