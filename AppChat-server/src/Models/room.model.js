import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";

const Room = sequelize.define("Room", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

Room.sync().then(() => {
    console.log("tạo bảng ROOM thành công");
});


export default Room;