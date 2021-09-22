import express from "express";
const controller = require("../controllers/userAccess");
const passport = require('passport')
const router = express.Router()

router.get('/:id', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router