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
const errorHandler_1 = require("../utils/errorHandler");
module.exports.login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield User_1.User.findOne({ email: req.body.email });
        if (candidate) {
            // Проверка пароля, пользователь существует
            const passwordResult = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
            if (passwordResult) {
                // Генерация токена, пароли совпали
                const token = jsonwebtoken_1.default.sign({
                    email: candidate.email,
                    userId: candidate._id,
                }, keys.jwt, { expiresIn: 60 * 60 });
                res.status(200).json({
                    token: `Bearer ${token}`,
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
        // email password
        const candidate = yield User_1.User.findOne({ email: req.body.email });
        if (candidate) {
            // Пользователь существует, нужно отправить ошибку
            res.status(409).json({
                message: "Такой email уже занят. Попробуйте другой.",
            });
        }
        else {
            // Нужно создать пользователя
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = req.body.password;
            const user = new User_1.User({
                email: req.body.email,
                password: bcryptjs_1.default.hashSync(password, salt),
            });
            try {
                yield user.save();
                res.status(201).json(user);
            }
            catch (e) {
                errorHandler_1.errorHandler(res, e);
            }
        }
    });
};
//# sourceMappingURL=auth.js.map