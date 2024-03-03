import { Schema, model, Types } from "mongoose";
import QuestionList from "../types/questions";

interface QuestionsInterface {
  //   _id: Types.ObjectId; // Use _id as the primary key for MongoDB documents
  question_1: string;
  question_2: string;
  question_3: string;
}

//what we need for a question:
// mp3 file
// question name
// UI for the question (play button, text, animated playthrough(can skip or go back))

const questionSchema = new Schema<QuestionsInterface>(
  {
    question_1: {
      type: String,
      required: true,
    },
    question_2: {
      type: String,
      required: true,
    },
    question_3: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Questions = model<QuestionsInterface>("Questions", questionSchema);

export { QuestionsInterface, Questions };
