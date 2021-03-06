
const { body, validationResult } = require('express-validator');

const validationBodyRules = [
    body('login', 'login is required').exists(),
    body('password', 'password is required').exists(),
    body('login', 'login is required').notEmpty(),
    body('password', 'password is required').notEmpty()
];

const checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registration = module.exports = { validationBodyRules, checkRules };