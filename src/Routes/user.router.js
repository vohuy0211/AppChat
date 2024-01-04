import express from "express";
import userController from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/login', userController.handleLogin);
userRouter.post('/register', userController.handleRegister);
userRouter.get('/get-user', userController.getAllUser);

export default userRouter;
