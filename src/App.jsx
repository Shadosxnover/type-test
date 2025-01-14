import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Test from './pages/Test';
import Profile from './pages/Profile';
import AboutContact from './pages/AboutContact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;