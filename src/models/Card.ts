/* number	
card_user_id владелец карты	
rule Правило доступа	
status '1' => 'Активная','2' => 'Блокированная','3' => 'Утеряна' */

import mongoose from "mongoose";

import { CardInterface } from '../type/interface'
// Get the Schema constructor
const Schema = mongoose.Schema
const cardSchema = new mongoose.Schema({

    number: {
        type: Number,
        required: true,
        unique: true,
    },
    users_card_id: {
        type: Schema.Types.ObjectId,
        ref: "UsersCard",
        required: true
    },
    rule: {
        type: Schema.Types.ObjectId,
        ref: "Rule",
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
});

const Card = mongoose.model<CardInterface>("Cards", cardSchema);
export { Card };
