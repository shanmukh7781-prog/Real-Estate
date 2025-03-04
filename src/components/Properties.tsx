import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { properties as initialProperties } from '../data/properties';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import PropertyDetail from './PropertyDetail';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('');

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  const handleReserveProperty = (propertyId: string) => {
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === propertyId 
          ? { 
              ...property, 
              isBooked: !property.isBooked, 
              bookingTimestamp: !property.isBooked ? Date.now() : undefined 
            } 
          : property
      )
    );
    
    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty(prev => prev ? { 
        ...prev, 
        isBooked: !prev.isBooked, 
        bookingTimestamp: !prev.isBooked ? Date.now() : undefined 
      } : null);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.facing.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.size.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSize = !sizeFilter || property.size.toLowerCase().includes(sizeFilter.toLowerCase());
    
    if (filter === 'all') return matchesSearch && matchesSize;
    if (filter === 'available') return matchesSearch && matchesSize && !property.isBooked;
    if (filter === 'booked') return matchesSearch && matchesSize && property.isBooked;
    return matchesSearch && matchesSize;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        type: 'tween',
        ease: 'easeOut',
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 200
      }
    }
  };

  return (
    <section id="properties" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Our Premium Properties
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exclusive plots in RK Adarsh Nagar, Bhimavaram. Each property is carefully selected for its premium location and investment potential.
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search properties..."
              />
              <input
                type="text"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="block w-48 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Filter by size (sqft)"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'available' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter('booked')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'booked' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Booked
            </button>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard
                property={property}
                onClick={() => handlePropertyClick(property)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          </div>
        )}
        
        {selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onClose={handleCloseDetail}
            onReserve={handleReserveProperty}
          />
        )}
      </div>
    </section>
  );
};

export default Properties;