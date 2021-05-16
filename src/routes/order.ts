import express from 'express'
const controller = require('../controllers/order')
const router = express.Router()


router.get('/', controller.getAll)
router.post('/', controller.create)


module.exports = router