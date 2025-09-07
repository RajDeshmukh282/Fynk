import React, { useState } from "react";
import axios from "axios";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
import ClipLoader from "react-spinners/ClipLoader"; // ✅ Import spinner
import logo from "../assets/logo.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  // --- Step 1: Send OTP ---
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: formData.email,
      });
      setMessage({ type: "success", text: "OTP sent successfully!" });
      setStep(2);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error sending OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify OTP ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      setMessage({ type: "success", text: "OTP verified successfully!" });
      setStep(3);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Invalid or expired OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Step 3: Reset Password ---
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: formData.email,
        password: formData.password,
      });

      setMessage({
        type: "success",
        text: "Password reset successfully! Redirecting...",
      });

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error resetting password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] lg:max-w-[60%] min-h-[500px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23] shadow-xl shadow-black/40"
      >
        {/* Left Form Section */}
        <form
          onSubmit={
            step === 1
              ? handleEmailSubmit
              : step === 2
              ? handleOtpSubmit
              : handleResetSubmit
          }
          className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-6 gap-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {step === 1
              ? "Forgot Password"
              : step === 2
              ? "Enter OTP"
              : "Reset Password"}
          </h2>

          {step === 1 && (
            <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition">
              <AiOutlineMail className="text-gray-600 mr-2 text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-gray-700"
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition">
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="bg-transparent outline-none w-full text-gray-700"
                required
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center w-full max-w-[320px] bg-gray-100 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-black transition relative">
              <AiOutlineLock className="text-gray-600 mr-2 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                className="bg-transparent outline-none w-full text-gray-700"
                required
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
          )}

          {/* Message Display */}
          {message.text && (
            <div
              className={`w-full max-w-[320px] text-center text-sm p-2 rounded-md ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[320px] bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:bg-gray-500 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : step === 1 ? (
              "Send OTP"
            ) : step === 2 ? (
              "Verify OTP"
            ) : message.type === "success" ? (
              "Redirecting..."
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Right Logo Section */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-6 text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <motion.img
            src={logo}
            alt="Fynk"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-40 drop-shadow-[0_0_20px_#ff0000] drop-shadow-[0_0_40px_#ff0000] drop-shadow-[0_0_60px_#ff0000]"
          />
          <p className="text-lg">Fynk | Where Stories Begin</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
