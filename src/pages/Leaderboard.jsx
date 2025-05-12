import React from 'react';
import places from '../jsComponents/places';
import  "../assets/css/main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

const Leaderboard = () => {
  // Sort by rating descending
  const sortedPlaces = [...places].sort((a, b) => b.rating - a.rating);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Top-Rated Gems <FontAwesomeIcon icon={faChartBar} /></h2>
      <ul className="leaderboard-list">
        {sortedPlaces.map((place, index) => (
          <li key={place.id} className="leaderboard-item">
            <div className="rank">{index + 1}</div>
            <img src={place.profilePic} alt={place.name} className="place-img" />
            <div className="place-info">
              <h4>{place.name}</h4>
              <p className="type">{place.type}</p>
              <p className="rating">⭐ {place.rating}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;