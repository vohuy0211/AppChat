import UserRoom from "../Models/userRoom.model.js";

class userRoomController {
    async handleCreate(req, res) {
        try {
            const { UserId, RoomId } = req.body;

            const newUserRoom = await UserRoom.create({
                UserId,
                RoomId,
            })

            res.status(201).json({ msg: "Phòng đã được tạo thành công", data: newUserRoom });
        } catch (error) {
            res.status(500).json({ msg: "Lỗi" });
        }
    }

    async handleGetUserRoom(req, res) {
        try {
            const userRoom = await UserRoom.findAll();
            res.status(200).json({ data: userRoom });
        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
}

export default new userRoomController();