import { Op } from "sequelize";
import models from "../Models/index.js";

const { User, Room, UserRoom, Message } = models;

class roomController {
    async handleCreateRoom(req, res) {
        try {
            const { userId, receiverId } = req.body;

            const existingRoom = await Room.findOne({
                where: {
                    [Op.or]: [
                        { userId, receiverId },
                        { userId: receiverId, receiverId: userId },
                    ],
                },
            });

            if (existingRoom) {
                return res.status(200).json({ msg: "Phòng đã tồn tại", data: existingRoom });
            }

            const newRoom = await Room.create({
                userId,
                receiverId,
            });

            res.status(201).json({ msg: "Phòng đã được tạo thành công", data: newRoom });
        } catch (error) {
            res.status(500).json({ msg: "Lỗi" });
        }
    }

    async handleGetRoomById(req, res) {
        try {
            const { userId, receiverId } = req.params;

            const room = await Room.findOne({
                where: {
                    [Op.or]: [
                        { userId, receiverId },
                        { userId: receiverId, receiverId: userId },
                    ],
                },
            });

            if (!room) {
                return res.status(404).json({ msg: 'Không tìm thấy phòng' });
            }

            res.status(200).json({ msg: 'Lấy phòng thành công', data: room });
        } catch (error) {
            res.status(500).json({ msg: 'Lỗi' });
            console.log(error);
        }
    }

    async updateDateListMessages(req, res) {
        try {
            const { roomId } = req.params;
    
            const room = await Room.findByPk(roomId);
    
            if (!room) {
                return res.status(404).json({ msg: 'Không tìm thấy phòng' });
            }
    
            const latestMessage = await Message.findOne({
                where: { roomId },
                order: [['createdAt', 'DESC']],
                attributes: ['text', 'createdAt'] 
            });
    
            room.lastMessage = latestMessage ? latestMessage.text : null; 
            room.lastMessageTime = latestMessage ? latestMessage.createdAt : null;
    
            await room.save(); 
    
            res.status(200).json({ msg: 'Cập nhật trường lastMessage thành công', data: room });
        } catch (error) {
            console.error('Lỗi khi cập nhật trường lastMessage:', error);
            res.status(500).json({ msg: 'Lỗi khi cập nhật trường lastMessage', error: error.message });
        }
    }
}

export default new roomController();
