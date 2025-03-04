import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '../types';
import { properties } from '../data/properties';
import PropertyModel from './PropertyModel';

const CinematicShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'house' | 'plot'>('house');

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % properties.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const currentProperty = properties[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-indigo-900 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Experience Our Premium Plots
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Take a cinematic journey through our exclusive properties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={handleAnimationComplete}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">{currentProperty.title}</h3>
            <p className="text-gray-300 text-lg mb-6">{currentProperty.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-indigo-400">Location:</span>
                <span className="ml-2 text-white">{currentProperty.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-400">Size:</span>
                <span className="ml-2 text-white">{currentProperty.size}</span>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-400">Price:</span>
                <span className="ml-2 text-white">₹{currentProperty.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <span className="text-indigo-400">Facing:</span>
                <span className="ml-2 text-white">{currentProperty.facing}</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-3">Premium Amenities</h4>
              <div className="grid grid-cols-2 gap-3">
                {currentProperty.amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white bg-opacity-10 rounded-lg p-3 text-sm"
                  >
                    {amenity}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <motion.div
              key={`${currentIndex}-image`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={currentProperty.image} 
                alt={currentProperty.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-white bg-opacity-80 text-indigo-800 font-medium"
              >
                Premium Plot Image
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {properties.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-indigo-500' : 'bg-gray-400'}`}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicShowcase;