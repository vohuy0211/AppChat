import chatModel from "../Models/message.model.js";
import User from "../Models/user.model.js";
import UserRoom from "../Models/userRoom.model.js";

class chatController {
  async handlePostChat(req, res) {
    try {
      const { text, userId } = req.body;

      const newMessage = await chatModel.create({
        text,
        userId,
      });

      req.app.get("io").emit("chatMessage", newMessage);

      res.status(200).json({
        message: "Tin nhắn đã gửi thành công",
        data: newMessage,
      });
    } catch (error) {
      console.error("Lỗi khi lưu tin nhắn:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra khi xử lý tin nhắn",
        error: error.message,
      });
    }
  }

  async handleGetAllChat(req, res) {
    try {
      const allMessages = await chatModel.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      const localMessages = allMessages.map((message) => {
        const localDate = new Date(
          message.createdAt.getTime() -
            message.createdAt.getTimezoneOffset() * 60000,
        );
        return {
          ...message.toJSON(),
          createdAt: localDate.toISOString(),
        };
      });

      res.status(200).json({
        message: "Lấy danh sách tin nhắn thành công",
        data: localMessages,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tin nhắn:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra khi lấy danh sách tin nhắn",
        error: error.message,
      });
    }
  }
}

export default new chatController();
