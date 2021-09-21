const express = require('express');

const passport = require('passport')
const controller = require('../controllers/account')
const router = express.Router()

/* поддержку сеанса отключена, установлено session в false. */
router.get('/user', passport.authenticate('jwt', { session: false }), controller.getUser)

module.exports = router