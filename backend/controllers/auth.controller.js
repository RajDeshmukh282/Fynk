import user from "../models/user.model";
import bycrypt from "bcryptjs"

export const SignUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const findByEmail = await user.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const findByUserName = await user.findOne({ email });
    if (findByUserName) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const hashedPassword = await bycrypt.hash(password,10)//protect and hash password using bycrypt
    const user = await User.create({ name, username, email,password :hashedPassword });

    const token = await genToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000, secure: false, sameSite: " strict" }); // 10 years
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const Sign = async (req, res) => {
  try {
    const { username , password } = req.body;
    const user =  await User.findOne({username})
    if(!user){
      return res.status(400).json({ message: "Invalid credentials" });

    }

    const isMatch = await bycrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = await genToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000, secure: false, sameSite: " strict" }); // 10 years
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
