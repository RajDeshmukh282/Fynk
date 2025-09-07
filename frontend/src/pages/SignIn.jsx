import React from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import logo from "../assets/logo.png";

const SignIn = () => {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4">
        <div className="w-[90%] lg:max-w-[60%] h-[500px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23] shadow-xl shadow-black/40 transition-all duration-500 hover:scale-[1.01]">
          
          {/* Left Form Section */}
          <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-6 gap-6">
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              Sign In
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
            <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition">
              <AiOutlineLock className="text-gray-600 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-gray-700"
              />
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
            <img
              src={logo}
              alt="Fynk"
              className="w-70 animate-pulse drop-shadow-lg"
            />
            <p className="text-lg">Welcome Back to Fynk</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
