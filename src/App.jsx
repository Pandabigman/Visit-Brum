import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Gems from './pages/Gems';
import Explore from './pages/Explore';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar appName="Brum Explorer" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gems" element={<Gems/>} />
        <Route path="/gems/explore" element={<Explore/>} />
      </Routes>
    </Router>
  );
}

export default App;
