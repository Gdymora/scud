import { Card } from "../models/Card";

module.exports.getAll = async function (req, res) {

    try {
        const card = await Card.find({})
        console.log(card)
        if (card) {
            res.status(200).json({
                card: card
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карту за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }

    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error("ERROR ", req.headers.authorization, e)
    }
}

module.exports.getById = async function (req, res) {

    try {
        const card = await Card.findOne({ _id: req.params.id })
        console.log(card)
        if (card) {
            res.status(201).json({
                card: card
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карту за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error("ERROR ", req.headers.authorization, e)
    }
}


module.exports.create = async function (req, res) {
    try {
        const card = await new Card({
            number: req.body.number,
            users_card_id: req.body.users_card_id,
            rule: req.body.rule,
            status: req.body.status,
        }).save()
        res.status(201).json({ message: 'Карту було змінено.' })
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        const card = await Card.findByIdAndDelete(req.params.id)

        if (card._id === req.params.id) {
            res.status(201).json({
                message: 'Карту вдало видалено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карту за таким номером не знайдено.', param: 'card', location: 'body' } }
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
        const card = await Card.findOneAndUpdate(

            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )

        if (card._id === req.params.id) {
            res.status(201).json({
                message: 'Карту було оновлено.'
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карту за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }

    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}