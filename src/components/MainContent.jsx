import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import disasterData from './newTweets.json'; // Assuming the JSON file is in the same folder

const MainContent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Use Vite's import.meta.env
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
      });

      disasterData.forEach(({ Date, Time, DisasterType, Location, Summary }) => {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: Location }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              animation: google.maps.Animation.BOUNCE,
              title: `${DisasterType} in ${Location}`,
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <h3>${DisasterType} in ${Location}</h3>
                <p><strong>Date:</strong> ${Date}</p>
                <p><strong>Time:</strong> ${Time}</p>
                <p><strong>Summary:</strong> ${Summary}</p>
              `,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          } else {
            console.error('Geocode failed due to: ' + status);
          }
        });
      });
    });
  }, []);

  return (
    <div className="main-content">
      <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '550px' }} />
    </div>
  );
};

export default MainContent;
