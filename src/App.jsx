import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Gems from './pages/Gems';
import Explore from './pages/Explore';
import Navbar from './components/Navbar';
import SubmitGem from './pages/SubmitGem';

function App() {
  return (
    <Router>
      <Navbar appName="Brum Explorer" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gems" element={<Gems/>} />
        <Route path="/explore/:id" element={<Explore/>} />
        <Route path='/gems/add' element={<SubmitGem/>}/>
      </Routes>
    </Router>
  );
}

export default App;
