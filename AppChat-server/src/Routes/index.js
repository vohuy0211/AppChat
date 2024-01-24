import chatRouter from "./chatRoom.router.js";
import roomRouter from "./room.router.js";
import userRouter from "./user.router.js";
import userRoomRouter from "./userRoom.router.js";

function Routes(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/chatRoom", chatRouter);
  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/userRoom", userRoomRouter)
}

export default Routes;
