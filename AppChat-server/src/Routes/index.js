import chatRouter from "./chatRoom.router.js";
import userRouter from "./user.router.js";

function Routes(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/chatRoom", chatRouter);
}

export default Routes;
