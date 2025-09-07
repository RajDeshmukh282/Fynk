import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";
import React from "react";
import SignUp from "./pages/SignUp";

 const App = ()=>{
  return(<>
  
    <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        </>
  )
}
export default App;