import mongoose, { Schema, Types } from "mongoose";

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
    type: Types.ObjectId,
    ref: "User",
  },
});

const Microstory = mongoose.model(
  "Microstory",
  microstorySchema,
  "microstories"
);

export default Microstory;
