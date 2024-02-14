import { Schema, model } from "mongoose";

interface User {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const userSchema = new Schema<User>({
  userId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const User = model<User>("User", userSchema);

export default User;
