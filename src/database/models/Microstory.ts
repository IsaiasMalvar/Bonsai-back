import mongoose, { Schema, Types } from "mongoose";
import User from "./User.js";

const microstorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  dateOfCreation: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  story: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Microstory = mongoose.model(
  "Microstory",
  microstorySchema,
  "microstories"
);

export default Microstory;
