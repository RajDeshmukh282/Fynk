import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-2xl text-white">
        <h2 className="text-4xl font-bold mb-4 text-center">Welcome Back</h2>
        <p className="text-gray-300 mb-8 text-center text-lg">
          Sign in to continue your journey.
        </p>

        <form className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>

          <div className="text-sm text-right">
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold">
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-lg">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
