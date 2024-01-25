import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";

const UserRoom = sequelize.define("UserRoom", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

export default UserRoom;