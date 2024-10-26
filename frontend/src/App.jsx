// src/App.jsx
import React, { useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserList from "./components/UserList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserUpdate from "./components/UserUpdate";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<UserList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update" element={<UserUpdate />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
