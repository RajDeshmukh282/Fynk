// Importing the main jsonwebtoken library to generate and verify JWTs
import jwt from "jsonwebtoken";

// Importing dotenv so we can load environment variables from a .env file
import dotenv from "dotenv";

// Loading environment variables from .env into process.env
dotenv.config();

// Defining an async function to generate a JWT token for a given userId
const genToken = async (userId) => {
    try {
        // Creating a new JWT using jwt.sign()
        // 1. Payload: { userId } → embeds the userId into the token
        // 2. Secret: process.env.JWT_SECRET → secret key from .env file for signing
        // 3. Options: { expiresIn: "10y" } → token will expire after 10 years
        const token = await jwt.sign(
            { userId }, 
            process.env.JWT_SECRET, 
            { expiresIn: "10y" }
        );

        // Returning the generated token so it can be used by the caller
        return token;

    } catch (error) {
        // If token generation fails, execution comes here
        // Good practice: log or throw the error instead of keeping it empty
        console.error("Error generating token:", error);
        throw error;
    }
};

// Exporting the function so other files can use it
export default genToken;
