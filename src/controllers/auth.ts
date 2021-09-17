import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
const keys = require("../config/keys");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: "Пароли не совпадают. Попробуйте снова.",
      });
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: "Пользователь с таким email не найден.",
    });
  }
};
  
module.exports.register = async function (req, res) {
    const candidate = await User.find({
      $or:
        [{ email: req.body.email }, { login: req.body.login }]
    });

    if (candidate.filter(cand => cand.email == req.body.email).length > 0) {
      // Пользователь существует, нужно отправить ошибку
      console.log('eml', candidate.filter(cand => cand.email == req.body.email))
      res.status(409).json({
        message: "Такой email уже занят. Попробуйте другой.",
      });
    }
    else if (candidate.filter(cand => cand.login == req.body.login).length > 0) {
      // Пользователь существует, нужно отправить ошибку
      console.log('log', candidate.filter(cand => cand.login == req.body.login))

      res.status(409).json({
        message: "Такой login уже занят. Попробуйте другой.",
      });
    } else {
      console.log("ddd")

      // Нужно создать пользователя
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const user = new User({
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      });

      try {
        await user.save();
        console.log(user)
        res.status(201).json({ user: user });
      } catch (e) {

      }
    }
  };
