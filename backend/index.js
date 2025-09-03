import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from "./routes/auth.routes.js"; // make sure you import your router
import isAuth from './middlewares/isAuth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Parse JSON request body
app.use(express.json());

// Parse cookies from client
app.use(cookieParser());

// Enable CORS for frontend (Vite React app)
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow cookies with requests
  })
);

// Mount auth routes under /api/auth
app.use("/api/auth", authRouter);
app.use("/api/user",isAuth)

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server & connect to database
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
});
