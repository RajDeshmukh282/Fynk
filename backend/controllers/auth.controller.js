// Importing the user model (mongoose schema) from models folder
import User from "../models/user.model.js";

// CORRECTED: Renamed the import and fixed file path casing
import { sendOtpEmail as sendEmailWithOTP } from "../config/Mail.js";

//import gentoken from
import genToken from "../config/token.js";

// Importing bcryptjs for hashing and comparing passwords securely
import bcrypt from "bcryptjs";

// Helper function to generate a 6-digit OTP. Moved here for clarity.
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


// ---------------------- SIGN UP CONTROLLER (No Changes) ----------------------
export const SignUp = async (req, res) => {
  try {
    // Extract name, username, email, and password from request body
    const { name, username, email, password } = req.body;

    // Check if a user with the same email already exists
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if a user with the same username already exists
    const findByUserName = await User.findOne({ username }); // fixed: was { email }
    if (findByUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Validate password length (at least 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash the password using bcrypt with salt rounds = 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database with hashed password
    const user = await User.create({ name, username, email, password: hashedPassword });

    // Generate a JWT token for the newly created user
    const token = await genToken(user._id);

    // Store token in cookie (httpOnly prevents client-side JS access, 10 years expiry)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
      secure: process.env.NODE_ENV === "production", // Recommended change: true in production
      sameSite: "strict"
    });

    // Send success response
    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    // Handle unexpected server errors
    console.log("Error in SignUp controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SIGN IN CONTROLLER (No Changes) ----------------------
export const Sign = async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user by username in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate new JWT token
    const token = await genToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
      secure: process.env.NODE_ENV === "production", // Recommended change: true in production
      sameSite: "strict"
    });

    // Success response
    return res.status(200).json({ message: "User signed in successfully" });

  } catch (error) {
    console.log("Error in Sign controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SIGN OUT CONTROLLER (No Changes) ----------------------
export const SignOut = async (req, res) => {
  try {
    // Clear the authentication token from cookies
    res.clearCookie("token");

    // Send success response
    return res.status(200).json({ message: "User signed out successfully" });

  } catch (error) {
    console.log("Error in SignOut controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SEND OTP CONTROLLER (Updated) ----------------------
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    const otp = generateOtp(); // Generate OTP here

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10-minute expiry
    user.isOtpVerified = false; // Always reset verification status on new OTP request

    await user.save();

    // Pass the generated OTP to the email service
    await sendEmailWithOTP(email, user.name, otp);

    return res.status(200).json({ message: "OTP sent to your email successfully." });

  } catch (error) {
    console.log("Error in sendOtp controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- VERIFY OTP CONTROLLER (Updated) ----------------------
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check for OTP existence and prevent accidental verification
    if (!user.resetOtp || !user.otpExpiry) {
      return res.status(400).json({ message: "No OTP found. Please request one first." });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      // Clear expired OTP from the database
      user.resetOtp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // On successful verification, update status and clear OTP data for security
    user.isOtpVerified = true;
    user.resetOtp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.log("Error in verifyOtp controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- RESET PASSWORD CONTROLLER (Updated) ----------------------
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // This is the most critical check: ensure OTP was verified
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "Please verify your OTP before resetting the password." });
    }

    // Hash the new password
    user.password = await bcrypt.hash(password, 10);

    // Reset the verification flag after a successful password change
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.log("Error in resetPassword controller:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

