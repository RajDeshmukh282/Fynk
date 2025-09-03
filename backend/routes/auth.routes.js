// Importing express to create a router
import express from "express";

// Importing CORS middleware to allow cross-origin requests
import cors from "cors";

// Importing cookie-parser to handle cookies in requests/responses
import cookieParser from "cookie-parser";

// Importing our auth controllers (signup, signin, signout functions)
import { SignUp, Sign, SignOut } from "../controllers/auth.controller.js";

const app = express(); // Create an Express app
const authRouter = express.Router(); // Create a router for auth routes

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend (Vite React app) to access backend
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json()); // Parse JSON request body
app.use(cookieParser()); // Parse cookies from client

// Mount all routes from authRouter under /api/auth
app.use("/api/auth", authRouter);

// ---------------- ROUTES ---------------- //
authRouter.post("/signup", SignUp);   // Route for user registration
authRouter.post("/signin", Sign);     // Route for user login
authRouter.post("/signout", SignOut); // Route for user logout

// Export the router (useful if this file is meant to be imported elsewhere)
export default authRouter;
