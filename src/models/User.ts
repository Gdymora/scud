import mongoose from "mongoose";

interface UserInterface extends mongoose.Document {
  login: string;
  email: string;
  password: string;
  role_id: string
}

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserInterface>("users", userSchema);
export { User };
