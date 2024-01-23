import Message from "../Models/message.model.js";
import chatModel from "../Models/message.model.js";
import User from "../Models/user.model.js";

class chatController {
  async handlePostChat(req, res) {
    try {
      const { text, userId, roomId } = req.body;

      const newMessage = await chatModel.create({
        text,
        userId,
        roomId,
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

  async handleGetMessagesById(req, res) {
    try {
      const { roomId } = req.params;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;

      const { count, rows: allMessages } = await Message.findAndCountAll({
        where: { roomId },
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      });

      const pageTotal = Math.ceil(count / limit);

      let paginatedMessages;

      if (page > pageTotal) {
        paginatedMessages = [];
      } else {
        const offset = (page - 1) * limit;
        paginatedMessages = allMessages.slice(offset, offset + limit);

        if (paginatedMessages.length < limit) {
          const remainingLimit = limit - paginatedMessages.length;

          const offsetPreviousPage = offset - limit;
          const olderMessages = allMessages.slice(offsetPreviousPage, offsetPreviousPage + remainingLimit).reverse();

          paginatedMessages = [...olderMessages.reverse(), ...paginatedMessages];
        }
      }

      res.status(200).json({
        message: "Lấy tin nhắn thành công",
        data: {
          messages: paginatedMessages,
          currentPage: Math.min(page, pageTotal),
          pageTotal,
          limit,
        },
      });
    } catch (error) {
      console.error("Lỗi khi lấy tin nhắn theo roomId:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra khi lấy tin nhắn",
        error: error.message,
      });
    }
  }
}

export default new chatController();
