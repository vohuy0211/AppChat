import express from "express";
import userController from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", userController.handleLogin);
userRouter.post("/register", userController.handleRegister);
userRouter.get("/getAllUser", userController.handleGetAllUser);
userRouter.get("/getUser/:id" , userController.handleGetUserById)

export default userRouter;
