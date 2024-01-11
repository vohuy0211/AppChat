import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";
import Room from "./room.model.js";
import User from "./user.model.js";

const UserRoom = sequelize.define("UserRoom", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Room.belongsToMany(User, { through: UserRoom });
User.belongsToMany(Room, { through: UserRoom });

UserRoom.sync().then(() => {
    console.log("Tạo bảng trung gian thành công");
});

export default UserRoom;