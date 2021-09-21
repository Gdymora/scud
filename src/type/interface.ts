import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
    login: string;
    email: string;
    password: string;
    role_id: string
}

export interface UsersInterface extends mongoose.Document {
    dtime_registration: string;
    last_name: string;
    first_name: string;
    phone: string;
    enterprise: string;
}

export interface CardInterface extends mongoose.Document {
    number: Number;
    card_user_id: Number;
    rule: Number;
    status: Number;
}

export interface RuleInterface extends mongoose.Document {
    rule_name: string;
    day: [Number];
    hour_first: [string];
    hour_the_second: [string];
}