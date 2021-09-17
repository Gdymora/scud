import express from "express";
const controller = require("../controllers/auth");
const router = express.Router();
const validatorRegister = require("../validators/registration");

// localhost:5000/api/auth/login
router.post("/login", controller.login);

// localhost:5000/api/auth/register
router.post("/register", validatorRegister.validationBodyRules, validatorRegister.checkRules, controller.register);

module.exports = router;
