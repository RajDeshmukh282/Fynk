// Importing express to create a router
import express from "express";
// Importing our auth controllers (signup, signin, signout functions)
import { SignUp, Sign, SignOut } from "../controllers/auth.controller.js";
const app = express(); // Create an Express app
const authRouter = express.Router(); // Create a router for auth routes





// Mount all routes from authRouter under /api/auth


// ---------------- ROUTES ---------------- //
authRouter.post("/signup", SignUp);   // Route for user registration
authRouter.post("/signin", Sign);     // Route for user login
authRouter.post("/signout", SignOut); // Route for user logout

// Export the router (useful if this file is meant to be imported elsewhere)
export default authRouter;
