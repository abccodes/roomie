import { Schema, model, Types } from "mongoose";

type Question = {
  id: number;
  text: string;
};

const QuestionList: Question[] = [
  { id: 1, text: "What is the capital of France?" },
  { id: 2, text: 'Who wrote "Hamlet"?' },
  { id: 3, text: "What is the formula for water?" },
  { id: 4, text: "How many continents are there on Earth?" },
  { id: 5, text: "What year did the first man land on the moon?" },
];

export default QuestionList;
