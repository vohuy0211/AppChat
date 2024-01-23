import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./src/Routes/index.js"
import { Server } from "socket.io";
import http from "http";
import sequelize from "./src/libs/connect.mySQL.js"

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server().listen(server)

const PORT = 3000;
dotenv.config();
Routes(app);

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Người dùng đã kết nối:", socket.id);

    socket.on("disconnect", (roomId) => {
        socket.join(roomId);
        console.log("Người dùng đã ngắt kết nối:", socket.id);
    });

    io.emit("message", "Chào mừng đến với ứng dụng chat!");

    socket.on("disconnect", () => {
        console.log("Người dùng đã ngắt kết nối:", socket.id);
    });
});

server.listen(PORT, async () => {
    console.log(`listening on port http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('connect mysql successfully');
    } catch (error) {
        console.log('err', error);
    }
});