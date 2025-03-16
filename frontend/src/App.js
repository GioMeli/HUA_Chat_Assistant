import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";  // Import SignIn
import Register from "./components/Register";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />  {/* Default Page */}
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
