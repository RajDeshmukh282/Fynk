// Importing the user model (mongoose schema) from models folder
import User from "../models/user.model.js";

//import gentoken from 

import genToken from "../config/token.js";

// Importing bcryptjs for hashing and comparing passwords securely
import bcrypt from "bcryptjs";

// ---------------------- SIGN UP CONTROLLER ----------------------
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
      secure: false, // true in production with HTTPS
      sameSite: "strict"
    });

    // Send success response
    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    // Handle unexpected server errors
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SIGN IN CONTROLLER ----------------------
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
      secure: false,
      sameSite: "strict"
    });

    // Success response
    return res.status(200).json({ message: "User signed in successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------- SIGN OUT CONTROLLER ----------------------
export const SignOut = async (req, res) => {
  try {
    // Clear the authentication token from cookies
    res.clearCookie("token");

    // Send success response
    return res.status(200).json({ message: "User signed out successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

