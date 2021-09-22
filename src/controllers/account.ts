import { User } from "../models/User";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
const keys = require("../config/keys");

module.exports.getUser = async function (req, res) {

    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const jt = await JWT.verify(token, keys.jwt);
        const user = await User.findById(jt['userId'])
        if (user) {
            res.status(200).json({
                user: { login: user.login, email: user.email }
            })
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'users', location: 'body' } }
        })
        console.error("ERROR ", req.headers.authorization, e)
    }
}

module.exports.getUsers = async function (req, res) {

    try {
        const users = await User.find({})
        console.log(users)
        if (users) {
            res.status(200).json({
                users: users
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Користувача не знайдено.', param: 'users', location: 'body' } }
            });
        }
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'users', location: 'body' } }
        })
        console.error("ERROR ", req.headers.authorization, e)
    }
}

module.exports.getUserId = async function (req, res) {

    try {
        const user = await User.findOne({ country: req.params.id })
        console.log(user)
        if (user) {
            res.status(200).json({
                user: user
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Користувача за таким номером не знайдено.', param: 'user', location: 'body' } }
            });
        }
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'user', location: 'body' } }
        })
        console.error("ERROR ", req.headers.authorization, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        const card = await User.findByIdAndDelete(req.params.id)
        if (card._id === req.params.id) {
            res.status(200).json({
                message: 'Користувача було видалено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Користувача за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }

    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        mongoose.set('returnOriginal', false)
        /* установить new: true, findOneAndUpdate()вместо 
        этого предоставит вам объект после того, как update был применен */
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    login: req.body.login,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, salt),
                }
            },
            { new: true }
        )
        if (user._id === req.params.id) {
            res.status(200).json({
                message: 'Користувача було змінено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Користувача за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }
    } catch (e) {
        console.error(res, e)
    }
}
