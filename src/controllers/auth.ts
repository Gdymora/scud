import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
const keys = require("../config/keys");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });
  console.log(candidate)
  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const tokenModel = tokenGenerate(candidate)

      res.status(200).json({
        user: { access_token: `Bearer ${tokenModel.token}`, "expires_in": tokenModel.expires_in }
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        errors: { 0: { value: '', msg: 'Пароли не совпадают. Попробуйте снова.', param: 'email', location: 'body' } }
      });
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      errors: { 0: { value: '', msg: 'Пользователь с таким email не найден.', param: 'email', location: 'body' } }
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
    res.status(409).json({
      errors: { 0: { value: '', msg: 'Такой email уже занят. Попробуйте другой.', param: 'email', location: 'body' } }
    });
  }
  else if (candidate.filter(cand => cand.login == req.body.login).length > 0) {
    // Пользователь существует, нужно отправить ошибку
    console.log('log', candidate.filter(cand => cand.login == req.body.login))

    res.status(409).json({
      errors: { 0: { value: '', msg: 'Такой login уже занят. Попробуйте другой.', param: 'login', location: 'body' } }
    });
  } else {
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
      const tokenModel = tokenGenerate(user)
      console.log(`Bearer ${tokenModel.token}`)
      res.status(200).json({
        user: { access_token: `Bearer ${tokenModel.token}`, "expires_in": tokenModel.expires_in }
      });

    } catch (e) {

    }
  }
};

function tokenGenerate(user) {
  const expiresIn = 60 * 60
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    keys.jwt,
    { expiresIn: expiresIn }
  );
  return { token: token, expires_in: expiresIn }
}
