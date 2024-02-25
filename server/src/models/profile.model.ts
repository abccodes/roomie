import { Schema, model, Types } from "mongoose";

interface UserProfile {
  userId: Types.ObjectId; // Reference to User model
  profileImage: string;
  bio: string;
  location: string;
  dateOfBirth: Date; // Consider using Date for dateOfBirth
}

const profileSchema = new Schema<UserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Reference to User
      required: true,
      ref: "User", // This is how you link UserProfile to User
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserProfile = model<UserProfile>("UserProfile", profileSchema);

export { UserProfile };
