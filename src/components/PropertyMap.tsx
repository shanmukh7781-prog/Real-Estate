import React from 'react';

interface PropertyMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

const PropertyMap: React.FC<PropertyMapProps> = ({ coordinates }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${coordinates.lat},${coordinates.lng}&zoom=17&maptype=satellite`;
  
  return (
    <div className="w-full h-full">
      <iframe
        title="Property Location"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      />
    </div>
  );
};

export default PropertyMap;