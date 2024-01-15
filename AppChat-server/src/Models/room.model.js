import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";

const Room = sequelize.define("Room", {
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
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    uniqueKeys: {
        uniqueRoom: {
            fields: ['userId', 'receiverId']
        }
    }
});

Room.sync().then(() => {
    console.log("tạo bảng ROOM thành công");
});


export default Room;