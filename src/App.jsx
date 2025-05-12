import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import Gems from './pages/Gems';
import Explore from './pages/Explore';
import Navbar from './components/Navbar';
import SubmitGem from './pages/SubmitGem';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Shop from './pages/Shop';
import Plan from './pages/Plan';

function App() {
  return (
   
      <Router>
        <AppContent />
      </Router>
    );
  }
  
  function AppContent() {
    const location = useLocation();
    
    // paths where secondary Navbar should NOT be shown
    const noNavbarPaths = ['/', '/profile'];
    
    // Check if current path should display navbar
    const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);
    
    return (
      <>
        <Header />
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gems" element={<Gems />} />
          <Route path="/gems/explore/:id" element={<Explore />} />
          <Route path="/gems/submit" element={<SubmitGem />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </>
    );
 
}

export default App;
