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
  params: { id: string };
  body: {
    profileImage?: string;
    bio?: string;
    location?: string;
    dateOfBirth?: Date;
    school?: string;
    pronouns?: string;
    astrologicalSign?: string;
    employment?: string;
    major?: string;
    single?: boolean;
    sleepSchedule?: boolean; // Ensure this is intended to be a boolean
    hobbies?: string;
    smoking?: boolean;
    drinking?: boolean;
    loveLanguage?: string;
    temperature?: boolean; // Ensure this is intended to be a boolean
    weekendDescription?: string;
    politicalParty?: string;
    // Other fields as needed
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

    // const _id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
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
        userId: user._id,
      },
      getEnvVariable("JWT_SECRET"),
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      accessToken: jwtToken,
      userId: user._id,
    });
  }
);

//@dev
// Update updateOrCreateUserProfile to use the updated profile schema

const updateOrCreateUserProfile = async (
  req: ProfileUpdateRequest,
  res: Response
) => {
  const { id } = req.params;
  // Destructure new fields from req.body
  const {
    profileImage,
    bio,
    location,
    dateOfBirth,
    school,
    pronouns,
    astrologicalSign,
    employment,
    major,
    single,
    sleepSchedule,
    hobbies,
    smoking,
    drinking,
    loveLanguage,
    temperature,
    weekendDescription,
    politicalParty,
  } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found${id}` });
    }

    let profile = await UserProfile.findOne({ userId: user._id });

    if (profile) {
      // Profile exists, update it with new fields
      profile.profileImage = profileImage || profile.profileImage;
      profile.bio = bio || profile.bio;
      profile.location = location || profile.location;
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
      profile.school = school || profile.school;
      profile.pronouns = pronouns || profile.pronouns;
      profile.astrologicalSign = astrologicalSign || profile.astrologicalSign;
      profile.employment = employment || profile.employment;
      profile.major = major || profile.major;
      profile.single = single ?? profile.single; // Using ?? for boolean to differentiate false from undefined
      profile.sleepSchedule = Boolean(sleepSchedule) ?? profile.sleepSchedule;
      profile.hobbies = hobbies || profile.hobbies;
      profile.smoking = smoking ?? profile.smoking;
      profile.drinking = drinking ?? profile.drinking;
      profile.loveLanguage = loveLanguage || profile.loveLanguage;
      profile.temperature = Boolean(temperature) ?? profile.temperature; // Explicitly convert temperature to boolean
      profile.weekendDescription =
        weekendDescription || profile.weekendDescription;
      profile.politicalParty = politicalParty || profile.politicalParty;
    } else {
      // No profile exists, create a new one with all fields
      profile = new UserProfile({
        userId: user._id,
        profileImage,
        bio,
        location,
        dateOfBirth,
        school,
        pronouns,
        astrologicalSign,
        employment,
        major,
        single,
        sleepSchedule,
        hobbies,
        smoking,
        drinking,
        loveLanguage,
        temperature,
        weekendDescription,
        politicalParty,
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

const user = asyncHandler(
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

    // Return the whole user object in the response
    res.status(200).json({
      message: `User profile for ${user.fullName}`,
      success: true,
      profile: user, // Include the entire user object as 'profile' in the response
    });
  }
);

const profile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const profile = await UserProfile.findOne({ userId: id });

    if (!profile) {
      res.status(403).json({
        message: "User profile not found",
        success: false,
      });
      return;
    }

    // Return the whole user object in the response
    res.status(200).json({
      message: `Profile found for user ${profile.id}`,
      success: true,
      profile: profile, // Include the entire user object as 'profile' in the response
    });
  }
);

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

export { register, login, updateOrCreateUserProfile, user, users, profile };
