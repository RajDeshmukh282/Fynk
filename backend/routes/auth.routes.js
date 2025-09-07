// Importing express to create a router
import express from "express";

// Importing all of our auth controllers
import {
  SignUp,
  Sign,
  SignOut,
  sendOtp,
  verifyOtp,
  resetPassword
} from "../controllers/auth.controller.js";

// Create a router for auth routes
const authRouter = express.Router();

// ---------------- AUTHENTICATION ROUTES ---------------- //
authRouter.post("/signup", SignUp);   // Route for user registration
authRouter.post("/signin", Sign);     // Route for user login
authRouter.post("/signout", SignOut); // Changed to POST for consistency, but GET is also fine.

// ---------------- PASSWORD RESET ROUTES ---------------- //
authRouter.post("/send-otp", sendOtp);           // Route to send a password reset OTP
authRouter.post("/verify-otp", verifyOtp);       // Route to verify the OTP
authRouter.post("/reset-password", resetPassword); // Route to reset the password after verification

// Export the router to be used in your main server file
export default authRouter;
