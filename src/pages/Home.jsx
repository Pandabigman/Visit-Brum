import React from 'react';
import  "../assets/css/main.css";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
    Autocomplete
  } from '@react-google-maps/api';
import { useState} from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };
  
  const defaultCenter = {
    lat: 52.4862,
    lng: -1.8904 //birmingham cordinates
  };

const Home = () => {
    const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selected, setSelected] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const newCenter = {
          lat: location.lat(),
          lng: location.lng()
        };
        setMapCenter(newCenter);
        setSelected(newCenter);
      }
    }
  };
    
  
  

   
    return (
        <div className="home-container">
        <div className="home-content">
            <h1 className="home-title">Welcome to City Breaks</h1>
            <p className="home-subtitle">Thinking of Birmingham?</p>
            <p>We thought of you too!</p>
           
            <LoadScript
                googleMapsApiKey="AIzaSyDFGv0PJx9bsXQ9UqWFu1bYR7mHGWhce60"
                libraries={['places']}
                >
                <div className="position-relative mb-3">
                    {/* Search bar positioned absolutely */}
                    <div style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    width: '80%',
                    maxWidth: '800px'
                    }}>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <input
                        type="text"
                        placeholder="Search for places..."
                        className="form-control"
                        style={{ height: '45px', fontSize: '16px' }}
                        />
                    </Autocomplete>
                    </div>

                    <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={13}
                    mapTypeControl={true}
                    streetViewControl={true}
                    fullscreenControl={true}
                    >
                    <Marker
                        position={mapCenter}
                        onClick={() => setSelected(mapCenter)}
                    />

                    {selected && (
                        <InfoWindow
                        position={selected}
                        onCloseClick={() => setSelected(null)}
                        >
                        <div>
                            <h3>Birmingham</h3>
                            <p>You searched for this location.</p>
                        </div>
                        </InfoWindow>
                    )}
                    </GoogleMap>
                </div>
                </LoadScript>
            
        </div>
        
        </div>
    );
};

export default Home;