import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGem, faMedal, faShop, faPen, faSun, faMoon, faCity, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Load user data on component mount
  useEffect(() => {
    // Load username
    const savedUsername = localStorage.getItem('username') || 'User';
    setUsername(savedUsername);
    
    // Load profile image
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
  }, []);
  
  // Watch for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUsername = localStorage.getItem('username') || 'User';
      setUsername(savedUsername);
      
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
      
      const savedTheme = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedTheme);
    };
    
    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Create a custom event listener for this tab
    const localStorageSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      // Call the original function
      localStorageSetItem.apply(this, arguments);
      
      // Create and dispatch a custom event
      const event = new Event('localStorageChange');
      document.dispatchEvent(event);
    };
    
    // Listen for the custom event
    document.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const navItems = [
    { path: '/gems', icon: faGem, label: 'Gems' },
    { path: '/plan', icon: faPen, label: 'Planner' },
    { path: '/Shop', icon: faShop, label: 'Shop' },
    { path: '/gems/leaderboard', icon: faMedal, label: 'Leaderboard' },
  ];

  return (
    <nav className={`navbar navbar-expand-md navbar-${darkMode ? 'dark' : 'light'} bg-${darkMode ? 'dark' : 'light'} shadow-sm sticky-top`}>
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FontAwesomeIcon 
            icon={faCity} 
            className="me-2" 
            style={{ 
              color: darkMode ? '#9C27B0' : '#9C27B0',
              animation: 'spin-horizontal 4s linear infinite' 
            }}
          />
          <span className="fw-bold">VisitBrum</span>
          <style>
            {`
              @keyframes spin-horizontal {
                0% { transform: rotateY(0deg); }
                100% { transform: rotateY(360deg); }
              }
            `}
          </style>
        </Link>
        
        {/* Personalized greeting for medium+ screens */}
        <div className="d-none d-md-flex align-items-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {username && (
              <span className="fw-light">
                Welcome, <span className="fw-bold">{username}</span>!
              </span>
            )}
          </motion.div>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Nav items and user profile */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          {/* Personalized greeting for mobile only */}
          <div className="d-md-none my-3 text-center">
            {username && (
              <span className="fw-light">
                Welcome, <span className="fw-bold">{username}</span>!
              </span>
            )}
          </div>
          
          {/* Nav links */}
          <ul className="navbar-nav ms-auto mb-2 mb-md-0 align-items-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active fw-bold' : ''} d-flex align-items-center`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-1" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
            
            {/* Dark mode toggle */}
            <li className="nav-item">
              <button 
                className="nav-link btn" 
                onClick={toggleDarkMode}
              >
                <FontAwesomeIcon 
                  icon={darkMode ? faSun : faMoon} 
                  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                />
              </button>
            </li>
            
            {/* User profile link */}
            <li className="nav-item ms-md-2">
              <button 
                className="btn btn-outline-primary rounded-circle p-2"
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="rounded-circle"
                    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;