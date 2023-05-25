import { Schema, model } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    types: String,
    required: true,
    unique: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
