import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Check, X } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        y: {
          type: 'spring',
          damping: 25,
          stiffness: 200
        },
        opacity: { duration: 0.2 }
      }}
      className="bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-sm mx-auto"
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-48 sm:h-64 object-cover"
        />
        {property.isBooked && (
          <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-bl-lg font-semibold flex items-center text-sm sm:text-base">
            <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Booked
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 sm:p-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">{property.title}</h3>
          <div className="flex items-center text-white">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <p className="text-xs sm:text-sm">{property.location}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <p className="text-xl sm:text-2xl font-bold text-indigo-700">₹{property.price.toLocaleString()}</p>
          <p className="text-sm sm:text-base text-gray-600">{property.size}</p>
        </div>
        
        <div className="mb-3 sm:mb-4">
          <p className="text-sm sm:text-base text-gray-700 mb-2"><span className="font-semibold">Facing:</span> {property.facing}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          disabled={property.isBooked}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center text-sm sm:text-base ${property.isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {property.isBooked ? 'Already Booked' : 'View Details'}
          {!property.isBooked && <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;