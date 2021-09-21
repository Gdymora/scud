/* number	
card_user_id владелец карты	
rule Правило доступа	
status '1' => 'Активная','2' => 'Блокированная','3' => 'Утеряна' */

import mongoose from "mongoose";

import { CardInterface } from '../type/interface'

const cardSchema = new mongoose.Schema({
   
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    card_user_id: {
        type: Number,
        required: true,
    },
    rule: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
});

const Card = mongoose.model<CardInterface>("cards", cardSchema);
export { Card };
