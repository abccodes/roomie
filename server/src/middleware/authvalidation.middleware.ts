import { Request, Response, NextFunction } from "express";
import validator from "../utils/validate"; // Adjust the import path as necessary

// Assuming validator is a custom function, you might need to adjust its import if it's a default or named export

interface ValidationRule {
  [key: string]: string;
}

const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validateRule: ValidationRule = {
    fullName: "required|string|min:3",
    email: "required|email",
    password: "required|min:6",
    phoneNumber: "required|max:10|min:10",
  };

  try {
    await validator(req.body, validateRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validateRule: ValidationRule = {
    email: "required|email",
    password: "required|min:6",
  };

  try {
    await validator(req.body, validateRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export { registerValidation, loginValidation };
