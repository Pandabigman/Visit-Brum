import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLocationDot, faUpload, faCamera, faTag } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const SubmitGem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    location: '',
    type: 'Cafe', // Default value
    profilePic: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the file as data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          profilePic: reader.result
        });
        
        // Clear error
        if (errors.profilePic) {
          setErrors({
            ...errors,
            profilePic: ''
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Description is required';
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = 'Description should be less than 200 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.profilePic) {
      newErrors.profilePic = 'Image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create a unique ID for the new gem
      const newGemId = `user-gem-${Date.now()}`;
      
      const newGem = {
        ...formData,
        id: newGemId,
        userSubmitted: true,
        dateAdded: new Date().toISOString()
      };
      
      // Get existing gems from localStorage or create empty array
      const existingGems = JSON.parse(localStorage.getItem('userSubmittedGems') || '[]');
      
      // Add new gem to array
      const updatedGems = [...existingGems, newGem];
      
      // Save back to localStorage
      localStorage.setItem('userSubmittedGems', JSON.stringify(updatedGems));
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          shortDescription: '',
          location: '',
          type: 'Cafe',
          profilePic: ''
        });
        setPreviewImage(null);
        setSubmitSuccess(false);
        
        // Redirect to gems page to see submitted gem
        navigate('/gems');
      }, 2000);
    } catch (error) {
      console.error('Error saving gem:', error);
      setErrors({
        ...errors,
        submit: 'There was an error saving your gem. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
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

  const gemTypes = [
    'Cafe', 
    'Restaurant', 
    'Park', 
    'Shop', 
    'Museum', 
    'Gallery', 
    'Bar', 
    'Historic Site', 
    'Viewpoint', 
    'Other'
  ];

  return (
    <motion.div
      className="container mt-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 text-center"
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
          Submit Your Hidden Gem
        </h2>
        <style>
          {`
            @keyframes spin-horizontal {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
          `}
        </style>
        <p className="text-muted">Share your favorite spot in Birmingham with others!</p>
      </motion.div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <motion.div
            className="card shadow-sm"
            variants={itemVariants}
          >
            <div className="card-body p-4">
              {submitSuccess ? (
                <motion.div 
                  className="alert alert-success text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>Gem Successfully Submitted!</h4>
                  <p>Thank you for sharing your hidden gem with the community.</p>
                  <p>Redirecting to see all gems...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Image Upload Section */}
                  <motion.div 
                    className="mb-4 text-center"
                    variants={itemVariants}
                  >
                    <div className="position-relative d-inline-block">
                      <div 
                        className={`upload-preview rounded-3 d-flex flex-column align-items-center justify-content-center ${errors.profilePic ? 'border border-danger' : ''}`}
                        style={{
                          width: '100%',
                          maxWidth: '400px',
                          height: '300px',
                          backgroundColor: '#f8f9fa',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          margin: '0 auto'
                        }}
                        onClick={() => document.getElementById('profilePic').click()}
                      >
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="img-fluid"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faCamera} size="4x" className="text-secondary mb-3" />
                            <p className="mb-0">Click to upload an image</p>
                            <small className="text-muted">JPEG, PNG, or GIF (max 5MB)</small>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        className="d-none"
                        onChange={handleImageChange}
                      />
                      {errors.profilePic && (
                        <div className="text-danger small mt-1">{errors.profilePic}</div>
                      )}
                    </div>
                  </motion.div>

                  {/* Name Input */}
                  <motion.div className="mb-3" variants={itemVariants}>
                    <label htmlFor="name" className="form-label fw-bold">
                      <FontAwesomeIcon icon={faGem} className="me-2 text-primary" />
                      Name of Your Hidden Gem
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Secret Garden Cafe"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </motion.div>

                  {/* Description Input */}
                  <motion.div className="mb-3" variants={itemVariants}>
                    <label htmlFor="shortDescription" className="form-label fw-bold">
                      <FontAwesomeIcon icon={faUpload} className="me-2 text-success" />
                      Short Description
                    </label>
                    <textarea
                      className={`form-control ${errors.shortDescription ? 'is-invalid' : ''}`}
                      id="shortDescription"
                      name="shortDescription"
                      rows="3"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      placeholder="Tell us what makes this place special (max 200 characters)"
                      maxLength="200"
                    ></textarea>
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted">
                        {formData.shortDescription.length}/200 characters
                      </small>
                      {errors.shortDescription && <div className="text-danger small">{errors.shortDescription}</div>}
                    </div>
                  </motion.div>

                  {/* Location Input */}
                  <motion.div className="mb-3" variants={itemVariants}>
                    <label htmlFor="location" className="form-label fw-bold">
                      <FontAwesomeIcon icon={faLocationDot} className="me-2 text-danger" />
                      Location
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Jewellery Quarter, Birmingham"
                    />
                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                  </motion.div>

                  {/* Type Select */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="type" className="form-label fw-bold">
                      <FontAwesomeIcon icon={faTag} className="me-2 text-info" />
                      Type of Place
                    </label>
                    <select
                      className="form-select"
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      {gemTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div className="text-center" variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className="btn btn-primary px-5 py-2"
                      disabled={isSubmitting}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        <>Submit Hidden Gem</>
                      )}
                    </motion.button>
                    {errors.submit && (
                      <div className="text-danger mt-2">{errors.submit}</div>
                    )}
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmitGem;