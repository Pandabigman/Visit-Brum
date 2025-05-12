import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faGem, 
  faHeart, 
  faUpload, 
  faPenToSquare, 
  faTrashAlt, 
  faCheck, 
  faXmark, 
  faCameraRetro
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // User info states
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  // Dashboard data states
  const [favoriteGems, setFavoriteGems] = useState([]);
  const [submittedGems, setSubmittedGems] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Success/error message states
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Theme preference (light/dark)
  const [darkMode, setDarkMode] = useState(false);
  
  // Load user data on component mount
  useEffect(() => {
    // Load username
    const savedUsername = localStorage.getItem('username') || 'User';
    setUsername(savedUsername);
    setNewUsername(savedUsername);
    
    // Load profile image
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
    
    // Load favorite gems
    const favorites = JSON.parse(localStorage.getItem('favoriteGems') || '[]');
    setFavoriteGems(favorites);
    
    // Load user-submitted gems
    const submitted = JSON.parse(localStorage.getItem('userSubmittedGems') || '[]');
    setSubmittedGems(submitted);
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.body.classList.add('dark-mode');
    }
  }, []);
  
  // Save dark mode preference when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  // Handle username change
  const handleUsernameSubmit = () => {
    if (newUsername.trim() === '') {
      setErrorMessage('Username cannot be empty');
      return;
    }
    
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
    setIsEditingUsername(false);
    
    // Show success message and clear it after 3 seconds
    setSuccessMessage('Username updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        localStorage.setItem('profileImage', imageData);
        
        // Show success message and clear it after 3 seconds
        setSuccessMessage('Profile picture updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle favorite removal
  const handleRemoveFavorite = (gemId) => {
    const updatedFavorites = favoriteGems.filter(gem => gem.id !== gemId);
    setFavoriteGems(updatedFavorites);
    localStorage.setItem('favoriteGems', JSON.stringify(updatedFavorites));
    
    // Show success message and clear it after 3 seconds
    setSuccessMessage('Gem removed from favorites!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle user gem deletion
  const handleDeleteGem = (gemId) => {
    const updatedSubmissions = submittedGems.filter(gem => gem.id !== gemId);
    setSubmittedGems(updatedSubmissions);
    localStorage.setItem('userSubmittedGems', JSON.stringify(updatedSubmissions));
    
    // Also remove from favorites if it exists there
    const updatedFavorites = favoriteGems.filter(gem => gem.id !== gemId);
    if (favoriteGems.length !== updatedFavorites.length) {
      setFavoriteGems(updatedFavorites);
      localStorage.setItem('favoriteGems', JSON.stringify(updatedFavorites));
    }
    
    // Show success message and clear it after 3 seconds
    setSuccessMessage('Your gem has been deleted!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
    // clear local srotage
    const handleClear = () => {
      localStorage.clear();
      alert("All user data has been deleted.");
    };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      className={`container mt-5 mb-5 ${darkMode ? 'text-light' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dark mode CSS */}
      <style>
        {`
          .dark-mode {
            background-color: #121212;
            color: #e0e0e0;
          }
          
          .dark-mode .card {
            background-color: #1e1e1e;
            color: #e0e0e0;
            border-color: #333;
          }
          
          .dark-mode .bg-light {
            background-color: #2d2d2d !important;
          }
          
          .dark-mode .text-dark {
            color: #e0e0e0 !important;
          }
          
          .dark-mode .btn-outline-dark {
            color: #e0e0e0;
            border-color: #e0e0e0;
          }
          
          .dark-mode .btn-light {
            background-color: #333;
            color: #e0e0e0;
            border-color: #444;
          }
          
          .dark-mode .form-control {
            background-color: #333;
            color: #e0e0e0;
            border-color: #555;
          }
          
          .dark-mode .nav-tabs .nav-link.active {
            background-color: #333;
            color: #e0e0e0;
            border-color: #555;
          }
          
          .dark-mode .list-group-item {
            background-color: #2d2d2d;
            color: #e0e0e0;
            border-color: #444;
          }
          
          .gem-card {
            transition: transform 0.3s ease;
          }
          
          .gem-card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
      
      {/* Success and Error Messages */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            className="alert alert-success alert-dismissible fade show"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {successMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccessMessage('')}
            ></button>
          </motion.div>
        )}
        
        {errorMessage && (
          <motion.div 
            className="alert alert-danger alert-dismissible fade show"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {errorMessage}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setErrorMessage('')}
            ></button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="row">
        {/* Left column - User profile */}
        <div className="col-md-4 mb-4">
          <motion.div 
            className={`card shadow-sm ${darkMode ? 'text-light' : ''}`}
            variants={itemVariants}
          >
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                {/* Profile Image */}
                <div 
                  className="rounded-circle overflow-hidden bg-light d-flex align-items-center justify-content-center"
                  style={{ width: '150px', height: '150px', margin: '0 auto', cursor: 'pointer' }}
                  onClick={() => document.getElementById('profileImageInput').click()}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="img-fluid"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="4x" className="text-secondary" />
                  )}
                </div>
                <div 
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => document.getElementById('profileImageInput').click()}
                >
                  <FontAwesomeIcon icon={faCameraRetro} className="text-white" />
                </div>
                <input 
                  type="file"
                  id="profileImageInput"
                  className="d-none"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </div>
              
              {/* Username display/edit */}
              <AnimatePresence mode="wait">
                {isEditingUsername ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-3"
                  >
                    <div className="input-group">
                      <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        maxLength={20}
                      />
                      <button 
                        className="btn btn-success" 
                        onClick={handleUsernameSubmit}
                        title="Save username"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => {
                          setIsEditingUsername(false);
                          setNewUsername(username);
                        }}
                        title="Cancel"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-3"
                  >
                    <h3 className="h4 mb-0">
                      {username}
                      <button 
                        className="btn btn-sm ms-2"
                        onClick={() => setIsEditingUsername(true)}
                        title="Edit username"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* User stats */}
              <div className="row text-center mt-4">
                <div className="col-6">
                  <div className="h4 mb-0">{favoriteGems.length}</div>
                  <small className="text-muted">Favorites</small>
                </div>
                <div className="col-6">
                  <div className="h4 mb-0">{submittedGems.length}</div>
                  <small className="text-muted">Submissions</small>
                </div>
              </div>
            </div>
            
            {/* Settings section */}
            <div className={`card-footer ${darkMode ? 'bg-dark' : 'bg-light'}`}>
              <h5 className="mb-3">Settings</h5>
              
              {/* Dark mode toggle */}
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="darkModeToggle"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <label className="form-check-label" htmlFor="darkModeToggle">
                  Dark Mode
                </label>
              </div>
              
              {/* Navigation buttons */}
              <div className="d-grid gap-2 mt-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/gems')}
                >
                  Explore Gems
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/gems/submit')}
                >
                  Submit New Gem
                </button>
                <button 
                    className="btn btn-danger"
                    onClick={handleClear}>
                    Reset Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right column - Tabs for favorites and submissions */}
        <div className="col-md-8">
          <motion.div 
            className={`card shadow-sm ${darkMode ? 'text-light' : ''}`}
            variants={itemVariants}
          >
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                  >
                    <FontAwesomeIcon icon={faHeart} className="me-2" />
                    My Favorites
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submissions')}
                  >
                    <FontAwesomeIcon icon={faUpload} className="me-2" />
                    My Submissions
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="card-body">
              <AnimatePresence mode="wait">
                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                  <motion.div
                    key="favorites"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {favoriteGems.length > 0 ? (
                      <div className="row g-3">
                        {favoriteGems.map((gem) => (
                          <motion.div 
                            className="col-md-6" 
                            key={gem.id}
                            variants={cardVariants}
                            layout
                          >
                            <div className="card h-100 shadow-sm gem-card">
                              <div 
                                className="position-relative"
                                style={{ height: '180px' }}
                              >
                                <img 
                                  src={gem.profilePic} 
                                  alt={gem.name} 
                                  className="card-img-top"
                                  style={{ height: '100%', objectFit: 'cover' }}
                                />
                                <button
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                  onClick={() => handleRemoveFavorite(gem.id)}
                                  title="Remove from favorites"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">{gem.name}</h5>
                                <p className="card-text small">{gem.shortDescription}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="badge bg-info rounded-pill">{gem.type}</span>
                                  <button 
                                    className="btn btn-sm btn-primary"
                                    onClick={() => navigate(`/explore/${gem.id}`)}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <FontAwesomeIcon icon={faHeart} size="3x" className="text-secondary mb-3" />
                        <h5>No favorites yet</h5>
                        <p className="text-muted">Explore gems and save your favorites to see them here.</p>
                        <button 
                          className="btn btn-primary mt-2"
                          onClick={() => navigate('/gems')}
                        >
                          Explore Gems
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Submissions Tab */}
                {activeTab === 'submissions' && (
                  <motion.div
                    key="submissions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {submittedGems.length > 0 ? (
                      <div className="row g-3">
                        {submittedGems.map((gem) => (
                          <motion.div 
                            className="col-md-6" 
                            key={gem.id}
                            variants={cardVariants}
                            layout
                          >
                            <div className="card h-100 shadow-sm gem-card">
                              <div 
                                className="position-relative"
                                style={{ height: '180px' }}
                              >
                                <img 
                                  src={gem.profilePic} 
                                  alt={gem.name} 
                                  className="card-img-top"
                                  style={{ height: '100%', objectFit: 'cover' }}
                                />
                                <div className="position-absolute top-0 end-0 m-2 d-flex">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteGem(gem.id)}
                                    title="Delete gem"
                                  >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">{gem.name}</h5>
                                <p className="card-text small">{gem.shortDescription}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="badge bg-info rounded-pill">{gem.type}</span>
                                  <small className="text-muted">
                                    {new Date(gem.dateAdded).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <FontAwesomeIcon icon={faGem} size="3x" className="text-secondary mb-3" />
                        <h5>No submissions yet</h5>
                        <p className="text-muted">Share your favorite hidden gems with the community.</p>
                        <button 
                          className="btn btn-primary mt-2"
                          onClick={() => navigate('/submit-gem')}
                        >
                          Submit a Gem
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;