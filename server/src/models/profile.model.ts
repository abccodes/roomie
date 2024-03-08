/* trunk-ignore-all(prettier) */
import { Schema, model, Types } from "mongoose";
import { QuestionsInterface, Questions } from "./questions.model";

interface UserProfile {
  userId: Types.ObjectId; // Reference to User model
  school: string; // School for user
  profileImage: string; // Profile image for user
  pronouns: string; // Pronouns for user
  bio: string; // Bio for user
  astrologicalSign: string; // Astrological sign
  employment: string; // Employment status
  location: string; // Location of user
  dateOfBirth: Date; // Date for DOB
  major: string; // Major in college
  single: boolean; //relationship status
  sleepSchedule: boolean; // morning or night person
  hobbies: string; // what to do for fun
  smoking: boolean; //smoking status
  drinking: boolean; //drinking status
  loveLanguage: string; //love language
  temperature: boolean; //temperature preference, hot or cold
  weekendDescription: string; //what do you do on the weekends
  politicalParty: string; //political party
  //spotify -> work on spotify connections api
  // questions: QuestionsInterface; // use this to add mp3 questions later on.
}

const profileSchema = new Schema<UserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Reference to User
      required: true,
      ref: "User", // link UserProfile to User
    },
    school: { 
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
    },
    pronouns: {
      type: String,
      required: false,
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
    astrologicalSign: {
      type: String,
      required: false,
    },
    employment: {
      type: String,
      required: false,
    },
    major: {
      type: String,
      required: false,
    },
    single: {
      type: Boolean,
      required: false,
    },
    sleepSchedule: {
      type: Boolean,
      required: false,
    },
    hobbies: {
      type: String,
      required: false,
    },
    smoking: {
      type: Boolean,
      required: false,
    },
    drinking: {
      type: Boolean,
      required: false,
    },
    loveLanguage: {
      type: String,
      required: false,
    },
    temperature: {
      type: Boolean,
      required: false,
    },
    weekendDescription: {
      type: String,
      required: false,
    },
    politicalParty: {
      type: String,
      required: false,
    },
  }, { timestamps: true }
);

// questions: [Questions],
const UserProfile = model<UserProfile>("UserProfile", profileSchema);

export { UserProfile };
