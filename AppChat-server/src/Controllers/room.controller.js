import Room from "../Models/room.model.js";
import { Op } from "sequelize";

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
            console.log(error);
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

    //     async handleUpdateUnreadMessages(req, res) {
    //   try {
    //     const { roomId } = req.params;

    //     const room = await Room.findByPk(roomId);

    //     if (!room) {
    //       return res.status(404).json({ msg: 'Không tìm thấy phòng' });
    //     }

    //     // Đặt `unreadMessages` về 0 khi có người đọc tin nhắn
    //     room.unreadMessages = 0;
    //     await room.save();

    //     res.status(200).json({ msg: 'Cập nhật số lượng tin nhắn chưa đọc thành công', data: room });
    //   } catch (error) {
    //     res.status(500).json({ msg: 'Lỗi' });
    //     console.log(error);
    //   }
    // }
}

export default new roomController();
