import mongoose from "mongoose";
/* https://mongoosejs.com/docs/guide.html */
interface UsersInterface extends mongoose.Document {
    dtime_registration: string;
    last_name: string;
    first_name: string;
    phone: string;
    enterprise: string;
}

const userSchema = new mongoose.Schema({
    dtime_registration: {
        type: Date,
        default: Date.now
    },
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    enterprise: {
        type: String,
        required: true,
    },
});

const Users = mongoose.model<UsersInterface>("users", userSchema);
export { Users };