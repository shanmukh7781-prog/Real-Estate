import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-indigo-600 to-purple-600 pt-24 pb-16">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            <span className="block">Premium Plots at</span>
            <span className="block text-indigo-200">Shanmukh Estates</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl">
            Discover exclusive plots in the prestigious RK Adarsh Nagar, Bhimavaram. Build your dream home in a premium location with world-class amenities.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md shadow"
            >
              <a
                href="#properties"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                View Properties
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
            >
              <a
                href="#contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-white border border-white border-opacity-20">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-indigo-300" />
              <h3 className="ml-3 text-xl font-medium">Premium Plots</h3>
            </div>
            <p className="mt-4 text-indigo-100">Exclusive plots in prime locations with excellent connectivity and amenities.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-white border border-white border-opacity-20">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-indigo-300" />
              <h3 className="ml-3 text-xl font-medium">Prime Location</h3>
            </div>
            <p className="mt-4 text-indigo-100">Located in the heart of Bhimavaram with easy access to schools, hospitals, and markets.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-white border border-white border-opacity-20">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-300" />
              <h3 className="ml-3 text-xl font-medium">High ROI</h3>
            </div>
            <p className="mt-4 text-indigo-100">Invest in rapidly appreciating properties with excellent return on investment potential.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;