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
        
    }
}

export default new roomController();
