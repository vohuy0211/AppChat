import userModel from "../Models/user.model.js"
import bcrypt from "bcrypt"
import sceretKey from "../config/jwt.config.js"

class userController {
    async handleRegister(req, res) {
        const { email, password } = req.body;
        // console.log(req.body);
        try {
            const userData = await userModel.findOne({ where: { email } });
            if (userData) {
                return res.status(400).json({ msg: 'email đã tồn tại' })
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await userModel.create({ ...req.body, password: hashedPassword }); // Insert dữ liệu, password = password mới mã hóa

            res.status(200).json({ msg: 'Register Successfully', user });
        } catch (error) {

        }
    }

    async handleLogin(req, res) {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const userData = await userModel.findOne({where : {userData.email}});
            console.log(userData);
            // if (user) {
            //     console.log("có không");
            //     const myPass = await bcrypt.compare(password, user.password);
            //     if (myPass) {
            //         const accessToken = jwt.sign(user.dataValues, sceretKey);
            //         res.status(200).json({
            //             data: user,
            //             accessToken,
            //         });
            //     } else {
            //         res.status(401).json({ msg: 'Password Wrong' });
            //     }
            // } else {
            //     res.status(401).json({ msg: 'email dont exist' });
            // }
        } catch (error) {
            res.status(404).json({ msg: 'not found' });
        }
    }

    async getAllUser(req, res) {

    }
}

export default new userController();