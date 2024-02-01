import express from "express";

import chatController from "../Controllers/chatRoom.controller.js";
import { multerUpload } from './../config/multer.js';

const chatRouter = express.Router();

chatRouter.post("/postChat", chatController.handlePostChat);
chatRouter.get("/:roomId", chatController.handleGetMessagesById);
chatRouter.put("/recallChat/:id", chatController.handleRecallChat);
chatRouter.get("/getMsgById/:id", chatController.getMsgById);
chatRouter.post("/upload", multerUpload.single('img'), chatController.upLoadImg)

export default chatRouter;
