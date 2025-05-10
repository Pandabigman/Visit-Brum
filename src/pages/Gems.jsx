import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgCarousel from '../components/ImgCarousel'
import places from '../jsComponents/places';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Gems = () => {
    const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDetailsClick = () => {
    if (selectedItem) navigate(`/details/${selectedItem.id}`);
  };
  return (
    <div className="container mt-5 align-items-center justify-content-center">
      <h2 className="mb-4">Discover Birmingham’s Hidden Gems <FontAwesomeIcon 
        icon={faGem} 
        size="1x" 
        color="#1976D2" 
        className="custom-class" 
        /> </h2>
      <ImgCarousel data={places} onIndexChange={setSelectedItem} />

      {selectedItem && (
        <div className="mt-4">
            
          <ul className="list-unstyled small">
            <li><strong>Type:</strong> {selectedItem.type}</li>
            <li><strong>Location:</strong> {selectedItem.location}</li>
          </ul>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={handleDetailsClick}>
              View More Details
            </button>
            <button className="btn btn-outline-secondary" >
              ❤️ Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gems