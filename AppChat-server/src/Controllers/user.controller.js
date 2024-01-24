import userModel from "../Models/user.model.js";
import bcrypt from "bcrypt";
import sceretKey from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

class userController {
  async handleRegister(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
      const userData = await userModel.findOne({ where: { email } });
      if (userData) {
        return res.status(400).json({ msg: "email đã tồn tại" });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userModel.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(200).json({ msg: "Register Successfully", user });
    } catch (error) { }
  }

  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      const userData = await userModel.findOne({ where: { email } });
      console.log(userData);
      if (userData) {
        const myPass = await bcrypt.compare(password, userData.password);
        if (myPass) {
          const accessToken = jwt.sign({ user: userData }, sceretKey);
          res.status(200).json({
            data: userData,
            accessToken,
          });
        } else {
          res.status(401).json({ msg: "Password Wrong" });
        }
      } else {
        res.status(401).json({ msg: "email dont exist" });
      }
    } catch (error) {
      res.status(404).json(error.message);
    }
  }

  async handleGetAllUser(req, res) {
    try {
      const allUsers = await userModel.findAll({

      });
      res.status(200).json({ data: allUsers });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  async handleGetUserById(req, res) {
    try {
      const userId = req.params.id;

      const user = await userModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({ msg: "Không tìm thấy người dùng với id đã cho" });
      }

      res.status(200).json({ msg: "Người dùng đã được tìm thấy", data: user });
    } catch (error) {
      res.status(500).json({ msg: "Lỗi" });
      console.log(error);
    }
  }

  async handleSearch(req, res) {
    const searchTerm = req.params.searchTerm;
    try {
      const userAll = await userModel.findAll({
        where: {
          username: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      res.status(200).json({ data: userAll });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server loi' });
    }
  }
}

export default new userController();
