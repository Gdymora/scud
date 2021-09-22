import { Rule } from "../models/Rule";

module.exports.getAll = async function (req, res) {

    try {
        const rule = await Rule.find({})
        console.log(rule)
        if (rule) {
            res.status(200).json({
                rule: rule
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Правило не знайдено.', param: 'card', location: 'body' } }
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
        const rule = await Rule.findOne({_id: req.params.id })
        console.log(rule)
        if (rule) {
            res.status(200).json({
                rule: rule
            })
        } else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Правило не знайдено.', param: 'card', location: 'body' } }
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
        const rule = await new Rule({
            number: req.body.number,
            rule_name: req.body.rule_name,
            day: req.body.day,
            hour_first: req.body.hour_first,
            hour_the_second: req.body.hour_the_second,
        }).save()
        res.status(201).json(rule)

        
    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {

        const rule = await Rule.findByIdAndDelete(req.params.id)

        if (rule._id === req.params.id) {
            res.status(200).json({
                message: 'Правило було видалено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Правило за таким номером не знайдено.', param: 'card', location: 'body' } }
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

        const rule = await Rule.findOneAndUpdate(

            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        if (rule._id === req.params.id) {
            res.status(200).json({
                message: 'Правило було змінено.'
            })
        }
        else {
            res.status(404).json({
                errors: { 0: { value: '', msg: 'Правило за таким номером не знайдено.', param: 'card', location: 'body' } }
            });
         }

    } catch (e) {
        res.status(503).json({
            errors: { 0: { value: '', msg: 'Помилка бази даних.', param: 'card', location: 'body' } }
        })
        console.error(res, e)
    }
}