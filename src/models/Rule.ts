import mongoose from "mongoose";

import { RuleInterface } from '../type/interface'
/* rule_name название правила	day	hour_first Время после которого
 доступ разрешен	hour_the_second время после которого доступ запрещен */
const cardSchema = new mongoose.Schema({

    rule_name: {
        type: String,
        required: true,
    },
    day: {
        type: [Number],
        required: true,
    },
    hour_first: {
        type: [String],
        required: true,
    },
    hour_the_second: {
        type: [String],
        required: true,
    },
});

const Rule = mongoose.model<RuleInterface>("Rule", cardSchema);
export { Rule };