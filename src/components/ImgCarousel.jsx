import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


// Main Carousel Component
const ImgCarousel = ({
    data, 
    onIndexChange 
  }) => {
    
  
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onIndexChange(data[currentIndex]);
  }, [currentIndex, data, onIndexChange]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };
    

  
    return (
        <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="position-relative w-100" style={{ maxWidth: '700px' }}>
          <div className="border rounded shadow-sm overflow-hidden bg-white">
            <img
              src={data[currentIndex].profilePic}
              alt={data[currentIndex].name}
              className="img-fluid w-100"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="p-3">
              <h5>{data[currentIndex].name}</h5>
              <p className="text-muted">{data[currentIndex].shortDescription}</p>
            </div>
          </div>
  
          {/* Navigation Arrows */}
          <button
            className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y"
            onClick={goToPrevious}
          >
           <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
          <button
            className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y"
            onClick={goToNext}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>
      </div>
    );
  };
  
export default ImgCarousel;