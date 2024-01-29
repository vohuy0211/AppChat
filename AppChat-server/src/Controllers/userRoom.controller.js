import { Op } from "sequelize";
import models from "../Models/index.js";

const { User, Room, UserRoom, Message } = models;

class userRoomController {
    async handleCreate(req, res) {
        try {
            const { userId, roomId } = req.body;

            if (!userId || !roomId) {
                return res.status(400).json({ msg: "Thiếu thông tin userId hoặc roomId" });
            }

            const existingUserRoom = await UserRoom.findOne({
                where: {
                    userId,
                    roomId,
                },
            });

            if (existingUserRoom) {
                return res.status(404).json({ msg: "Người dùng đã có trong cuộc trò chuyện" });
            }

            const newUserRoom = await UserRoom.create({
                userId,
                roomId,
            })

            res.status(201).json({ msg: "Phòng đã được tạo thành công", data: newUserRoom });
        } catch (error) {
            res.status(500).json({ msg: error });
            console.log(error);
        }
    }

    async handleGetUserRoom(req, res) {
        try {
            const { id } = req.params;
    
            // Fetch all rooms associated with the user, either as sender or receiver
            const rooms = await Room.findAll({
                where: {
                    [Op.or]: [
                        { userId: id },
                        { receiverId: id }
                    ]
                },
                include: [{
                    model: User,
                    attributes: ['id', 'username']
                }],
                order: [['lastMessage', 'DESC']]
            });
    
            // You can format the data here as needed
            // For instance, you might want to merge room information with userRoom details
    
            res.status(200).json({ msg: "User rooms list", data: rooms });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
}

export default new userRoomController();