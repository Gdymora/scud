"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = require("../controllers/auth");
const router = express_1.default.Router();
const validatorRegister = require("../validators/registration");
// localhost:5000/api/auth/login
router.post("/login", controller.login);
// localhost:5000/api/auth/register
router.post("/register", validatorRegister.validationBodyRules, validatorRegister.checkRules, controller.register);
module.exports = router;
//# sourceMappingURL=auth.js.map