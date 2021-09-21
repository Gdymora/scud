import { User } from "../models/User";
import JWT from "jsonwebtoken";
const keys = require("../config/keys");

module.exports.getUser = async function (req, res) {

    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const jt = await JWT.verify(token, keys.jwt);

        console.log(jt['userId'])
        const user = await User.findById(jt['userId'])
        console.log(user)
        if (user) {
            res.status(200).json({
                user: { login: user.login, email: user.email }
            })
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        console.error("ERROR ", req.headers.authorization, e)
    }
}