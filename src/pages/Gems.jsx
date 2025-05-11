import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import places from '../jsComponents/places';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLocationDot, faHeart, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';


const Gems = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(places[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const sliderRef = useRef(null);
  
  useEffect(() => {
    // Ensure we always have a selected item
    if (!selectedItem && places.length > 0) {
      setSelectedItem(places[0]);
    }
  }, []);

  const handleDetailsClick = () => {
    if (selectedItem) navigate(`/explore/${selectedItem.id}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * places.length);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(randomIndex);
      // Directly update the selected item without waiting for afterChange
      setSelectedItem(places[randomIndex]);
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
      setSelectedItem(places[next]);
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

  // For debugging
  console.log("Current selected item:", selectedItem);

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
        <h2 className="display-5 fw-bold">
          <FontAwesomeIcon
            icon={faGem}
            className="me-2"
            style={{
              color: '#9C27B0',
              animation: 'spin-horizontal 4s linear infinite'
            }}
          />
          Birmingham's Hidden Gems
        </h2>
        <style>
          {`
            @keyframes spin-horizontal {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
          `}
        </style>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="container d-flex align-items-center justify-content-center mt-4">
          <div className="position-relative w-100" style={{ maxWidth: '700px' }}>
            <Slider ref={sliderRef} {...settings}>
              {places.map((item, index) => (
                <div key={index} onClick={() => setSelectedItem(item)}>
                  <div className="border rounded shadow-sm overflow-hidden bg-white">
                    <img
                      src={item.profilePic}
                      alt={item.name}
                      className="img-fluid w-100"
                      style={{ height: '500px', width: '600px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </motion.div>

      {/* Random selection button */}
      <motion.div 
        className="mt-3"
        variants={itemVariants}
      >
        <motion.button
          className="btn btn-secondary"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleRandomSelect}
        >
          <FontAwesomeIcon icon={faShuffle} className="me-2" />
          Random Gem
        </motion.button>
      </motion.div>

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
                Explore Details
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gems;