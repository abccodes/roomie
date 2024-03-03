import { Schema, model, Types } from "mongoose";
import { QuestionsInterface, Questions } from "./questions.model";

interface UserProfile {
  userId: Types.ObjectId; // Reference to User model
  profileImage: string;
  bio: string;
  location: string;
  dateOfBirth: Date; // Date for DOB
  questions: QuestionsInterface;
}

const profileSchema = new Schema<UserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Reference to User
      required: true,
      ref: "User", // link UserProfile to User
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
    questions: [Questions],
  },
  { timestamps: true }
);

const UserProfile = model<UserProfile>("UserProfile", profileSchema);

export { UserProfile };
