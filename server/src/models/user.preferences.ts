import { Schema, model, Types } from "mongoose";

interface UserPreferences {
  userId: Types.ObjectId; // Reference to User model
  gender: string;
  housingPrefrence: string; // What is more important: price, location, ect
  status: string; // Looking for rooomate to move in, looking for roomates for new home, found roomates
  dorm: boolean; //dorm or off campus
}

//what we need for a question:
// mp3 file
// question name
// UI for the question (play button, text, animated playthrough(can skip or go back))

const userPreferencesSchema = new Schema<UserPreferences>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Reference to User
      required: true,
      ref: "User", // link UserProfile
    },
    gender: {
      type: String,
      required: true,
    },
    housingPrefrence: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dorm: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const UserPrefrences = model<UserPreferences>("User", userPreferencesSchema);

export { UserPrefrences };
