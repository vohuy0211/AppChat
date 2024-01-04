import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes from "./src/Routes/index.js"

const app = express();
const PORT = 3000
dotenv.config();

app.use(cors());
app.use(express.json());

Routes(app);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Kết nối mongoDB thành công");
}).catch((err) => {
    console.log(err.message);
})

app.listen(PORT, () => {
    console.log(`Server chạy thành công trong http://localhost:${PORT}`);
});