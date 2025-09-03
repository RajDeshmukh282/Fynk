// Controller to get details of the currently authenticated user
export const getCurrentUser = async (req, res) => {
  try {
    // req.userId is set in isAuth middleware after verifying JWT
    const userId = req.userId;

    // Find user by ID in the database
    const user = await User.findById(userId);

    // If no user found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
