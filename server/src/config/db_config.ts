import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const DBConnection = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Database Connected: ${DBConnection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectToDB;
