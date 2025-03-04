import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ArrowRight, Check, Clock } from 'lucide-react';
import { Property } from '../types';
import PropertyModel from './PropertyModel';
import PropertyMap from './PropertyMap';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  onReserve: (propertyId: string) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose, onReserve }) => {
  const [showModel, setShowModel] = useState(true);
  const [showPlot, setShowPlot] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [reservationTime, setReservationTime] = useState<number | null>(null);

  useEffect(() => {
    if (property.bookingTimestamp) {
      setReservationTime(property.bookingTimestamp);
    }
  }, [property]);

  const handleReserve = () => {
    onReserve(property.id);
    if (!property.isBooked) {
      setReservationTime(Date.now());
    } else {
      setReservationTime(null);
    }
  };

  const getTimeRemaining = () => {
    if (!reservationTime) return null;
    
    const reservationDate = new Date(reservationTime);
    const expiryDate = new Date(reservationDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days
    const now = new Date();
    
    const timeRemaining = expiryDate.getTime() - now.getTime();
    if (timeRemaining <= 0) return null;
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 30,
            stiffness: 300,
            mass: 0.8
          }}
          className="bg-white rounded-xl overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-grow overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-6">
                <div className="h-80 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {showModel && <PropertyModel size={property.size} facing={property.facing} viewMode="house" propertyType={property.title} />}
                    {showPlot && <PropertyModel size={property.size} facing={property.facing} viewMode="plot" />}
                    {showMap && <PropertyMap coordinates={property.coordinates} />}
                  </div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setShowModel(true); setShowPlot(false); setShowMap(false); }}
                      className={`px-4 py-2 rounded-full ${showModel ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                    >
                      3D House
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setShowModel(false); setShowPlot(true); setShowMap(false); }}
                      className={`px-4 py-2 rounded-full ${showPlot ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                    >
                      Plot View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setShowModel(false); setShowPlot(false); setShowMap(true); }}
                      className={`px-4 py-2 rounded-full ${showMap ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                    >
                      Map View
                    </motion.button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{property.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-900">₹{property.price.toLocaleString()}</h3>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {property.size}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-indigo-700 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-indigo-900">Location</h4>
                        <p className="text-indigo-700">{property.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-indigo-700 mt-0.5 mr-2">↗</div>
                      <div>
                        <h4 className="font-medium text-indigo-900">Facing</h4>
                        <p className="text-indigo-700">{property.facing}</p>
                      </div>
                    </div>
                  </div>
                  
                  {property.isBooked && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <X className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">This plot is already booked</h3>
                          {timeRemaining && (
                            <div className="mt-2 text-sm text-red-700">
                              <p className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                Reservation expires in: {timeRemaining.days} days and {timeRemaining.hours} hours
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!property.isBooked ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReserve}
                      className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                    >
                      Reserve Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  ) : timeRemaining ? (
                    <div className="mt-6 space-y-4">
                      <div className="text-center text-sm text-gray-700 bg-indigo-50 p-4 rounded-lg">
                        <p className="font-medium mb-2">Important Booking Information</p>
                        <ul className="space-y-2 text-left list-disc pl-4">
                          <li>Your reservation is valid for 3 days</li>
                          <li>Contact our sales team at +91-XXXXXXXX10</li>
                          <li>Visit our office with required documents</li>
                          <li>Initial booking amount: 10% of property value</li>
                        </ul>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleReserve}
                        className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-red-200"
                      >
                        Cancel Reservation
                        <X className="ml-2 h-4 w-4" />
                      </motion.button>
                    </div>
                  ) : null}
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Investment Potential</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Annual Growth</span>
                      <span className="font-medium text-green-600">8-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">5-Year Projection</span>
                      <span className="font-medium text-green-600">₹{Math.round(property.price * 1.5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Demand Rating</span>
                      <span className="font-medium text-indigo-600">Very High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetail;