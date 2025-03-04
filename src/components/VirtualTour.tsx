import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Maximize, Minimize, RotateCcw } from 'lucide-react';

interface VirtualTourProps {
  propertyId: string;
  propertyTitle: string;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ propertyId, propertyTitle }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentViewpoint, setCurrentViewpoint] = useState(0);
  
  // Mock viewpoints for the virtual tour
  const viewpoints = [
    { name: 'Entrance', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80' },
    { name: 'Living Area', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
    { name: 'Garden View', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80' },
    { name: 'Surroundings', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80' },
  ];

  useEffect(() => {
    // Simulate loading the 360 images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate effect
    const rotationInterval = setInterval(() => {
      if (!isLoading) {
        setRotation(prev => (prev + 0.2) % 360);
      }
    }, 50);

    return () => clearInterval(rotationInterval);
  }, [isLoading]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const resetRotation = () => {
    setRotation(0);
  };

  const navigateToViewpoint = (index: number) => {
    setIsLoading(true);
    setCurrentViewpoint(index);
    
    // Simulate loading the new viewpoint
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-full w-full'}`}>
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFullscreen}
          className="bg-white bg-opacity-70 p-2 rounded-full shadow-lg"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetRotation}
          className="bg-white bg-opacity-70 p-2 rounded-full shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white bg-opacity-70 px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-gray-800">{viewpoints[currentViewpoint].name}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white bg-opacity-70 px-4 py-2 rounded-full shadow-lg flex space-x-3">
          {viewpoints.map((viewpoint, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateToViewpoint(index)}
              className={`w-3 h-3 rounded-full ${index === currentViewpoint ? 'bg-indigo-600' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      <div className="h-full w-full overflow-hidden relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-700 font-medium">Loading virtual tour...</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${viewpoints[currentViewpoint].image})`,
              rotate: rotation,
              scale: 1.2, // Slightly larger to avoid seeing edges during rotation
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        )}
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-white bg-opacity-70 px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm text-gray-800">{propertyTitle}</p>
          <p className="text-xs text-gray-600">Virtual Tour</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;