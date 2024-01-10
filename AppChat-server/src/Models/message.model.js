import sequelize from "../libs/connect.mySQL.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Room from "./room.model.js";

const Message = sequelize.define(
  "Message",
  {
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
  },
  {
    timestamps: true,
  },
);

Message.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Message, { foreignKey: "userId" });

Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });

Message.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(Message, { foreignKey: "roomId" });

Message.sync().then(() => {
  console.log("tạo bảng messages thành công");
});

export default Message;
