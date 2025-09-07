import React, { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] lg:max-w-[60%] h-[650px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23] shadow-xl shadow-black/40"
      >
        {/* Left Form Section */}
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-6 gap-6">
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Welcome Back
          </h2>

          {/* Username */}
          <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition">
            <AiOutlineUser className="text-gray-600 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition relative">
            <AiOutlineLock className="text-gray-600 mr-2 text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent outline-none w-full text-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-600 hover:text-black"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <button className="w-full max-w-[320px] bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
            Sign In
          </button>

          {/* Links */}
          <div className="flex flex-col items-center gap-2 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Right Logo Section */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-6 text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <motion.img
            src={logo}
            alt="Fynk"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
            className="w-40 drop-shadow-[0_0_20px_#ff0000] drop-shadow-[0_0_40px_#ff0000] drop-shadow-[0_0_60px_#ff0000]"
          />
          <p className="text-lg">Fynk | Where Stories Begin</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
