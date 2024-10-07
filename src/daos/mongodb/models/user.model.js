import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isGithub: {
    type: Boolean,
    required: true,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    required: true,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    default: []
  },
  last_connection:{
    type: Date,
    default: new Date
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const userColl = "users";
export const UserModel = model(userColl, usersSchema);