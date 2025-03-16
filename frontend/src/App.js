import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import SignIn from './components/SignIn';
import Register from './components/Register';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

