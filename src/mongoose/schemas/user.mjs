import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayname: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
