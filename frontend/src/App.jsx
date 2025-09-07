import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import React from "react";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";

 const App = ()=>{
  return(<>
  
    <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
        </>
  )
}
export default App;