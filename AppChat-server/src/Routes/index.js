import chatRouter from "./chatRoom.router.js";
import roomRouter from "./room.router.js";
import userRouter from "./user.router.js";

function Routes(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/chatRoom", chatRouter);
  app.use("/api/v1/room", roomRouter);

}

export default Routes;
