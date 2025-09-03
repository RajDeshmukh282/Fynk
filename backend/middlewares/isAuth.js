import jwt from "jsonwebtoken"; // Import jsonwebtoken for verifying JWTs

// Middleware to check if the user is authenticated
const isAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookies (set during login/signup)
    const token = req.cookies.token;

    // 2. If no token is found, reject the request
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // 3. Verify the token using the secret key
    // If valid, jwt.verify() returns the payload (e.g., { userId, iat, exp })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach userId from token payload to the request object
    // So routes can know "which user" is making the request
    req.userId = decoded.userId;

    // 5. Call next() to pass control to the next middleware/route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return Unauthorized
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuth;
