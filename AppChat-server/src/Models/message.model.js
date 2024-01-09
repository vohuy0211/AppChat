import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Message.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Message, { foreignKey: "userId" });

Message.sync().then(() => {
  console.log("tạo bảng messages thành công");
});

export default Message;
