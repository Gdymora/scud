import { UsersCard } from "../models/UsersCard";

module.exports.getAll = async function (req, res) {

    try {
        const card = await UsersCard.find({})
        console.log(card)
        if (card) {
            res.status(200).json({
                card: card
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карти не знайдено.', param: 'card', location: 'body' } }
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
        const card = await UsersCard.findOne({ _id: req.params.id })
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


module.exports.create = async function (req, res) {
    try {
        const usersCard = await new UsersCard({
            number: req.body.number,
            users_card_id: req.body.users_card_id,
            rule: req.body.rule,
            status: req.body.status,
        }).save()
        res.status(201).json(usersCard)
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        const card = await UsersCard.findByIdAndDelete(req.params.id)
        if (card._id === req.params.id) {
            res.status(200).json({
                message: 'Картку було видалено.'
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
        mongoose.set('returnOriginal', false)
        /* установить new: true, findOneAndUpdate()вместо 
        этого предоставит вам объект после того, как update был применен */
        const usersCard = await UsersCard.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        if (usersCard._id === req.params.id) {
            res.status(200).json({
                message: 'Картку було змінено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Карту за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
        }
    } catch (e) {
        console.error(res, e)
    }
}