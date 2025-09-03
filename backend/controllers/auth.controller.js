import user from "../models/user.model";
import bycrypt from "bcryptjs"

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findByEmail = await user.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const findByUserName = await user.findOne({ email });
    if (findByUserName) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const hashedPassword = await bycrypt.hash(password,10)//protect and hash password using bycrypt
    const user = await User.create({ name, username, email });
  } catch (error) {
    console.log(error);
    
  }
};
