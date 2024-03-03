import express from "express";
const router = express.Router();

// Importing the auth validation functions for login and register
import {
  registerValidation,
  loginValidation,
} from "../middleware/authvalidation.middleware"; // Fix the casing of the import statement

// Importing functions from auth controller
import {
  login,
  register,
  userProfile,
  updateOrCreateUserProfile,
  users,
} from "../controller/auth.controller";

// Importing the JWT verifier from auth middleware
import verifyToken from "../middleware/auth.middleware";

// CRUD Routes

// Register route with register validation
router.post("/register", registerValidation, register);
// Login route with login validation
router.post("/login", loginValidation, login);
// Profile update route with JWT verification
router.post("/profile/:id", verifyToken, updateOrCreateUserProfile);

// ====================================

// Profile route with JWT verification
router.get("/profile/:id", verifyToken, userProfile);
// All users route with JWT verification
router.get("/users", verifyToken, users);

export default router;
