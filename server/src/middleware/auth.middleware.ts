import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend the Express request type to include userData
interface RequestWithUserData extends Request {
  userData?: jwt.JwtPayload | string;
}

// Utility function to safely access environment variables
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

const verifyToken = (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Token not provided");
    }
    const decoded = jwt.verify(token, getEnvVariable("JWT_SECRET"));
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
};

export default verifyToken;
