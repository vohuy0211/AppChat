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

            const userRooms = await UserRoom.findAll({
                where: {
                    userId: id
                }
            });

            const roomIds = userRooms.map(userRoom => userRoom.roomId);

            const rooms = await Room.findAll({
                where: {
                    id: roomIds
                },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Message,
                        attributes: ['content', 'createdAt'],
                        limit: 1,
                        order: [['createdAt', 'DESC']]
                    }
                ]
            });

            res.status(200).json({ data: rooms });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
}

export default new userRoomController();