// import sequelize from "../libs/connect.mySQL.js";
// import { DataTypes } from "sequelize";
// import Room from "./room.model.js";
// import User from "./user.model.js";

// const UserRoom = sequelize.define(
//     "UserRoom",
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//         }
//     },
//     {
//         timestamps: true,
//     },
// );

// UserRoom.belongsTo(User, { foreignKey: 'userId'});
// UserRoom.belongsTo(Room, { foreignKey: 'conversationId' });

// UserRoom.sync().then(() => {
//     console.log("tạo bảng user thành công");
// });

// export default UserRoom;
