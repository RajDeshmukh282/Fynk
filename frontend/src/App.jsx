import React from 'react'
import Router from './Router'
import './App.css'

function App() {
  return (
    <>

      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
    
  )
}

export default App