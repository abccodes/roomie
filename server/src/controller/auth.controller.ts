import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginBody {
  email: string;
  password: string;
}

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password, phoneNumber }: RegisterBody = req.body;

    const verifyEmail = await userModel.findOne({ email });
    if (verifyEmail) {
      res.status(403).json({
        message: "Email already used",
      });
      return;
    }

    const userId = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const user = new userModel({
      userId,
      fullName,
      email,
      password: hash,
      phoneNumber,
    });

    await user.save();
    res.status(201).json({
      message: "User successfully created!",
      success: true,
    });
  }
);

const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password }: LoginBody = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Authentication Failed",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Authentication Failed",
      });
      return;
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user.userId,
      },
      getEnvVariable("JWT_SECRET"),
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      accessToken: jwtToken,
      userId: user.userId,
    });
  }
);

const userProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await userModel.findOne({ userId: id });
    if (!user) {
      res.status(403).json({
        message: "User not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: `User ${user.fullName}`,
      success: true,
    });
  }
);

const users = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await userModel.find();
    res.status(200).json({
      data: users,
      success: true,
      message: "Users list",
    });
  }
);

export { register, login, userProfile, users };
