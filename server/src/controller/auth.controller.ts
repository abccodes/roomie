import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model"; // Correctly import User model
import { UserProfile } from "../models/profile.model"; // Import the UserProfile model
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Updated interface to reflect actual fields used for registration
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

// Interface for the request body to ensure type safety
interface ProfileUpdateRequest extends Request {
  params: { userId: string };
  body: {
    profileImage?: string;
    bio?: string;
    location?: string;
    dateOfBirth?: Date;
  };
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

    const verifyEmail = await User.findOne({ email });
    if (verifyEmail) {
      res.status(403).json({
        message: "Email already used",
      });
      return;
    }

    const userId = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
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

    const user = await User.findOne({ email });
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

    const user = await User.findOne({ userId: id });
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

const updateOrCreateUserProfile = async (
  req: ProfileUpdateRequest,
  res: Response
) => {
  const { userId } = req.params;
  const { profileImage, bio, location, dateOfBirth } = req.body;

  try {
    let profile = await UserProfile.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (profile) {
      // Profile exists, update it
      profile.profileImage = profileImage || profile.profileImage;
      profile.bio = bio || profile.bio;
      profile.location = location || profile.location;
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    } else {
      // No profile exists, create a new one
      profile = new UserProfile({
        userId: new Types.ObjectId(userId),
        profileImage,
        bio,
        location,
        dateOfBirth,
      });
    }

    await profile.save(); // Save changes or new profile
    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

const users = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find();
    res.status(200).json({
      data: users,
      success: true,
      message: "Users list",
    });
  }
);

export { register, login, updateOrCreateUserProfile, userProfile, users };
