import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar appName="Brum Explorer" />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/gems" element={<div>Gems Page</div>} />
        <Route path="/gems/discover" element={<div>Discover Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
