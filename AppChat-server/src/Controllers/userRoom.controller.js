import Room from "../Models/room.model.js";
import User from "../Models/user.model.js";
import UserRoom from "../Models/index.js";

class userRoomController {
    async handleCreate(req, res) {
        try {
            const { userId, roomId } = req.body;

            if (!userId || !roomId) {
                return res.status(400).json({ msg: "Thiếu thông tin userId hoặc roomId" });
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
            const userRooms = await UserRoom.findAll({
                include: [
                    {
                        model: Room,
                        attributes: ['lastMessage'],
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
                order: [[Room, 'lastMessage', 'DESC']],
            });

            res.status(200).json({ data: userRooms });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: error.message });
        }
    }
}

export default new userRoomController();