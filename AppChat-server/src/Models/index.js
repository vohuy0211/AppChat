import User from "./user.model.js";
import Room from "./room.model.js";
import UserRoom from "./userRoom.model.js";
import Message from "./message.model.js";

User.belongsToMany(Room, { through: UserRoom, foreignKey: 'userId' });
Room.belongsToMany(User, { through: UserRoom, foreignKey: 'roomId' });

Message.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Message, { foreignKey: "userId" });

Message.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(Message, { foreignKey: "roomId" });

Promise.all([
    User.sync(),
    UserRoom.sync(),
    Room.sync(),
    Message.sync()
]).then(() => {
    console.log("Tạo bảng thành công");
}).catch(error => {
    console.error("Lỗi khi tạo bảng:", error);
});

export default { User, Room, UserRoom, Message };