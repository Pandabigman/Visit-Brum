import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import places from '../jsComponents/places';
import  "../assets/css/main.css";
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';



const Explore = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const item = places.find((item) => item.id === id);
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: true,
        centerMode: true,
        centerPadding: '60px',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '40px',
            }
          },
          {
            breakpoint: 979,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '40px',
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '40px',
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '40px',
            }
          }
        ]
      };
  
    if (!item) {
      return (
        <div className="container mt-5">
          <h3>Not Found</h3>
          <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      );
    }
  
    const allImages = [item.profilePic, ...item.extraPics];

    return (
        <div className="container mt-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-3">BrumGem <FontAwesomeIcon
                      icon={faGem}
                      className="me-2"
                      style={{
                        color: '#0000FF',
                        animation: 'spin-horizontal 4s linear infinite'
                      }}
                    /></h1>
          
      
          <div className="d-flex justify-content-center mb-4">
            <div style={{ maxWidth: '900px', width: '100%' }}>
              <Slider {...sliderSettings}>
                {allImages.map((pic, index) => (
                  <div key={index}>
                    <img
                      src={pic}
                      alt={`Gallery ${index}`}
                      className="carousel-img"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
      
          <h3 className="mb-3">{item.name}</h3>
          <p className="text-muted">{item.type} • ⭐ {item.rating}</p>
      
          <p className="mx-auto" style={{ maxWidth: '600px', textAlign: 'justify' }}>
            {item.longDescription}
          </p>
      
          <h4 className="mt-4">Unique Experiences</h4>
          <motion.div
            className="mx-auto mb-4 p-3"
            style={{
              backgroundColor: '#f8f9fa',
              maxWidth: '600px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'left'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ul className="mb-0">
              {item.uniqueExperiences.map((exp, idx) => (
                <li key={idx} className="mb-2 ">
                  <FontAwesomeIcon icon={faGem} size="1x" color="#1976D2" spin /> {exp}
                </li>
              ))}
            </ul>
          </motion.div>
      
          
          <p><FontAwesomeIcon icon={faLocationDot}/> {item.location}</p>
      
          <div className="mt-4">
            <button className="btn btn-outline-primary me-2" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
            <button className="btn btn-outline-primary" onClick={() => {}}>
              Contact
            </button>
          </div>
        </motion.div>
      </div>
    );
  };
  
export default Explore;