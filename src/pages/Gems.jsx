import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import places from '../jsComponents/places';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLocationDot, faHeart, faShuffle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gems = () => {
  const navigate = useNavigate();
  const [allPlaces, setAllPlaces] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const sliderRef = useRef(null);
  
  // Load both predefined places and user submissions
  useEffect(() => {
    // Retrieve user submitted gems from localStorage
    const userGems = JSON.parse(localStorage.getItem('userSubmittedGems') || '[]');
    
    // Combine with predefined places
    const combinedPlaces = [...places, ...userGems];
    
    setAllPlaces(combinedPlaces);
    
    // Set initial selected item
    if (combinedPlaces.length > 0) {
      setSelectedItem(combinedPlaces[0]);
    }
    
    // Load favorites
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteGems') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Check if current item is in favorites
  useEffect(() => {
    if (selectedItem) {
      const isFav = favorites.some(fav => fav.id === selectedItem.id);
      setIsFavorite(isFav);
    }
  }, [selectedItem, favorites]);

  const handleDetailsClick = () => {
    if (selectedItem) navigate(`/gems/explore/${selectedItem.id}`);
  };

  const handleSubmitNewClick = () => {
    navigate('/submit-gem');
  };

  const toggleFavorite = () => {
    if (!selectedItem) return;
    
    let updatedFavorites;
    
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== selectedItem.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, selectedItem];
    }
    
    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteGems', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleRandomSelect = () => {
    if (allPlaces.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * allPlaces.length);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(randomIndex);
      // Directly update the selected item without waiting for afterChange
      setSelectedItem(allPlaces[randomIndex]);
    }
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow next-arrow"
        onClick={onClick}
        style={{ position: 'absolute', right: 0, top: '50%', cursor: 'pointer', zIndex: 2 }}
      >
        <span className="btn btn-dark">›</span>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="custom-arrow prev-arrow"
        onClick={onClick}
        style={{ position: 'absolute', left: 0, top: '50%', cursor: 'pointer', zIndex: 2 }}
      >
        <span className="btn btn-dark">‹</span>
      </div>
    );
  };

  // Define settings object for slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (current, next) => {
      // Update the selected item as soon as the change starts
      setSelectedItem(allPlaces[next]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  // Display a loading state while places are being fetched
  if (allPlaces.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading hidden gems...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mt-5 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 position-relative d-inline-block"
      >
        <h3 className="display-5 fw-bold">
          <FontAwesomeIcon
            icon={faGem}
            className="me-2"
            style={{
              color: '#9C27B0',
              animation: 'spin-horizontal 4s linear infinite'
            }}
          />
          DISCOVER A HIDDEN GEM
        </h3>
        
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="container d-flex align-items-center justify-content-center mt-4">
          <div className="position-relative w-100" style={{ maxWidth: '700px' }}>
            <Slider ref={sliderRef} {...settings}>
              {allPlaces.map((item, index) => (
                <div key={index} onClick={() => setSelectedItem(item)}>
                  <div className="border rounded shadow-sm overflow-hidden bg-white position-relative">
                    <img
                      src={item.profilePic}
                      alt={item.name}
                      className="img-fluid w-100"
                      style={{ height: '500px', width: '600px', objectFit: 'cover' }}
                    />
                    {item.userSubmitted && (
                      <div 
                        className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-2 rounded-pill"
                        style={{ fontSize: '0.8rem' }}
                      >
                        User Submitted
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      {/* <motion.div 
        className="mt-3 d-flex justify-content-center gap-3"
        variants={itemVariants}
      >
        
        
        <motion.button
          className="btn btn-success"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleSubmitNewClick}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Submit New Gem
        </motion.button>
      </motion.div> */}

      {/* Details section - keyed by ID to force re-render */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <motion.div
            key={selectedItem.id || Math.random()}
            className="mt-4 p-3 bg-light rounded shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h4 className="fw-bold mb-3">
              {selectedItem.name || "Loading..."}
            </motion.h4>

            <motion.p className="text-muted">
              {selectedItem.shortDescription || "Description loading..."}
            </motion.p>

            <motion.div className="d-flex justify-content-center gap-4 my-3">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faLocationDot} className="me-2 text-danger" />
                <span>{selectedItem.location || "Location loading..."}</span>
              </div>

              <div>
                <span className="badge bg-info rounded-pill">{selectedItem.type || "Type loading..."}</span>
              </div>
              
              {selectedItem.userSubmitted && (
                <div>
                  <span className="badge bg-success rounded-pill">User Submitted</span>
                </div>
              )}
            </motion.div>

            <motion.div
              className="d-flex gap-3 align-items-center justify-content-center"
            >
              <motion.button
                className="btn btn-primary px-4"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDetailsClick}
              >
                Explore 
              </motion.button>

              <motion.button
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={toggleFavorite}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="ms-2">{isFavorite ? 'Saved' : 'Save'}</span>
              </motion.button>
                <motion.button
                className="btn btn-secondary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleRandomSelect}
                >
                <FontAwesomeIcon icon={faShuffle} className="me-2" />
                Suprise me
            </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gems;