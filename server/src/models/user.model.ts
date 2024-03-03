import { Schema, model, Types } from "mongoose";

interface User {
  _id: Types.ObjectId; // Use _id as the primary key for MongoDB documents
  userId: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}



//what we need for a question:
// mp3 file
// question name
// UI for the question (play button, text, animated playthrough(can skip or go back))

const userSchema = new Schema<User>(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<User>("User", userSchema);

export { User };
