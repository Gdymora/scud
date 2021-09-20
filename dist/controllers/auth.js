"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const keys = require("../config/keys");
module.exports.login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield User_1.User.findOne({ email: req.body.email });
        if (candidate) {
            // Проверка пароля, пользователь существует
            const passwordResult = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
            if (passwordResult) {
                // Генерация токена, пароли совпали
                const tokenModel = tokenGenerate(candidate);
                /* jwt.sign(
                  {
                    email: candidate.email,
                    userId: candidate._id,
                  },
                  keys.jwt,
                  { expiresIn: 60 * 60 }
                ); */
                res.status(200).json({
                    user: { access_token: `Bearer ${tokenModel.token}`, "expires_in": tokenModel.expires_in }
                });
            }
            else {
                // Пароли не совпали
                res.status(401).json({
                    message: "Пароли не совпадают. Попробуйте снова.",
                });
            }
        }
        else {
            // Пользователя нет, ошибка
            res.status(404).json({
                message: "Пользователь с таким email не найден.",
            });
        }
    });
};
module.exports.register = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield User_1.User.find({
            $or: [{ email: req.body.email }, { login: req.body.login }]
        });
        if (candidate.filter(cand => cand.email == req.body.email).length > 0) {
            // Пользователь существует, нужно отправить ошибку
            console.log('eml', candidate.filter(cand => cand.email == req.body.email));
            res.status(409).json({
                errors: { 0: { value: '', msg: 'Такой email уже занят. Попробуйте другой.', param: 'email', location: 'body' } }
            });
        }
        else if (candidate.filter(cand => cand.login == req.body.login).length > 0) {
            // Пользователь существует, нужно отправить ошибку
            console.log('log', candidate.filter(cand => cand.login == req.body.login));
            res.status(409).json({
                errors: { 0: { value: '', msg: 'Такой login уже занят. Попробуйте другой.', param: 'login', location: 'body' } }
            });
        }
        else {
            // Нужно создать пользователя
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = req.body.password;
            const user = new User_1.User({
                login: req.body.login,
                email: req.body.email,
                password: bcryptjs_1.default.hashSync(password, salt),
            });
            try {
                yield user.save();
                console.log(user);
                const tokenModel = tokenGenerate(user);
                console.log(`Bearer ${tokenModel.token}`);
                res.status(200).json({
                    user: { access_token: `Bearer ${tokenModel.token}`, "expires_in": tokenModel.expires_in }
                });
            }
            catch (e) {
            }
        }
    });
};
function tokenGenerate(user) {
    const expiresIn = 60 * 60;
    const token = jsonwebtoken_1.default.sign({
        email: user.email,
        userId: user._id,
    }, keys.jwt, { expiresIn: expiresIn });
    return { token: token, expires_in: expiresIn };
}
//# sourceMappingURL=auth.js.map