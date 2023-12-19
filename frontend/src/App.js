import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes if needed */}
        </Routes>
    </Router>
  );
}

export default App;
