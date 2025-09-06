import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
        <nav className="mb-6 space-x-4">
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </nav>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
