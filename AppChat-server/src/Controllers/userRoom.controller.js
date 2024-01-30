import { Op } from "sequelize";
import models from "../Models/index.js";

const { User, Room, UserRoom, Message } = models;

class userRoomController {
    async handleCreate(req, res) {
        try {
            const { userIds, roomId } = req.body;

            if (!Array.isArray(userIds) || userIds.length !== 2 || !roomId) {
                return res.status(400).json({ msg: "Thông tin không hợp lệ, userIds phải là mảng gồm 2 ID" });
            }

            const existingUserRoom = await UserRoom.findOne({
                where: {
                    userId: userIds,
                    roomId,
                },
            });

            if (existingUserRoom) {
                return res.status(404).json({ msg: "Người dùng đã có trong cuộc trò chuyện" });
            }

            const newUserRooms = await Promise.all(userIds.map(userId =>
                UserRoom.create({ userId, roomId })
            ));

            res.status(201).json({ msg: "Phòng đã được tạo thành công", data: newUserRooms });
        } catch (error) {
            res.status(500).json({ msg: error });
            console.log(error);
        }
    }

    async handleGetUserRoom(req, res) {
        try {
            const { id } = req.params;

            const userRooms = await UserRoom.findAll({
                where: { userId: id },
                include: [
                    {
                        model: Room,
                        attributes: ['lastMessage'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username']
                            }
                        ]
                    }
                ],
                order: [
                    [Room, 'lastMessage', 'DESC'] 
                ]
            });

            const roomIds = userRooms.map(x => x.roomId)

            const rooms = await Room.findAll({
                where: { id: roomIds },
                include: [{
                    model: User,
                    attributes: ['id', 'username']
                }],
                order: [['lastMessage', 'DESC']] 
            });
            
            res.status(200).json({ msg: "User rooms list", data: rooms });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
}

export default new userRoomController();