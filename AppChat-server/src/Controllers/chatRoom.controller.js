import models from "../Models/index.js";

const { User, Room, UserRoom, Message } = models;

class chatController {
  async upLoadImg(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send('Không có file nào được tải lên.');
      }
      res.status(200).json({
        message: 'Tải lên thành công',
        data: req.file.path || req.file.url
      });
    } catch (error) {
      console.error('Lỗi khi tải hình ảnh:', error);
      res.status(500).json({
        message: 'Có lỗi xảy ra khi tải hình ảnh',
        error: error.message,
      });
    }
  }

  async handlePostChat(req, res) {
    try {
      const { text, userId, roomId } = req.body;
      let imageUrl = null;

      if (req.file) {
        imageUrl = req.file.path;
      }

      const newMessage = await Message.create({
        text,
        userId,
        roomId,
        img: imageUrl,
      });

      req.app.get("io").emit("chatMessage", newMessage);

      const room = await Room.findOne({ where: roomId });

      if (room) {
        room.lastMessage = new Date();
        await room.save();
      }

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
        order: [["updatedAt", "ASC"]],
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

  async handleRecallChat(req, res) {
    try {
      const { id } = req.params;
      const newStatus = req.body.status;
      // const currentUserId = req.userId;

      const message = await Message.findByPk(id);

      if (!message) {
        return res.status(404).json({ message: "Tin nhắn không tồn tại" });
      }

      // if (message.userId !== currentUserId) {
      //   return res.status(403).json({ message: "Bạn không có quyền gỡ tin nhắn này" });
      // }

      message.status = newStatus;
      await message.save();

      res.status(200).json({
        message: "Tin nhắn đã được cập nhật thành công",
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        message: "Có lỗi xảy ra khi cập nhật tin nhắn",
        error: error.message,
      });
    }
  }

  async getMsgById(req, res) {
    try {
      const { id } = req.params;

      const message = await Message.findByPk(id);

      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }

      res.status(200).json({
        message: "Message retrieved successfully",
        data: message
      });
    } catch (error) {
      console.error("Error retrieving message:", error);
      res.status(500).json({
        message: "An error occurred while retrieving the message",
        error: error.message
      });
    }
  }
}

export default new chatController();
