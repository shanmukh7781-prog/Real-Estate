import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface PropertyComparisonProps {
  properties: Property[];
  onClose: () => void;
  onViewProperty: (propertyId: string) => void;
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
  onClose,
  onViewProperty
}) => {
  const [visibleProperties, setVisibleProperties] = useState<Property[]>(
    properties.slice(0, Math.min(3, properties.length))
  );
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 3 < properties.length) {
      setStartIndex(startIndex + 1);
      setVisibleProperties(properties.slice(startIndex + 1, startIndex + 4));
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setVisibleProperties(properties.slice(startIndex - 1, startIndex + 2));
    }
  };

  // Define comparison categories
  const categories = [
    { name: 'Basic Information', fields: ['title', 'location', 'price', 'size', 'facing'] },
    { name: 'Amenities', fields: ['amenities'] },
    { name: 'Status', fields: ['isBooked'] }
  ];

  // Format property values for display
  const formatValue = (property: Property, field: string) => {
    switch (field) {
      case 'price':
        return `₹${property.price.toLocaleString()}`;
      case 'amenities':
        return (
          <div className="flex flex-col space-y-1">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-xs">{amenity}</span>
              </div>
            ))}
          </div>
        );
      case 'isBooked':
        return property.isBooked ? (
          <span className="text-red-600 font-medium">Booked</span>
        ) : (
          <span className="text-green-600 font-medium">Available</span>
        );
      default:
        return property[field as keyof Property];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 30 }}
        className="bg-white rounded-xl overflow-hidden w-full max-w-7xl max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Compare Properties</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          {properties.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No properties to compare. Please select at least two properties.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation buttons */}
              {properties.length > 3 && (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={startIndex + 3 >= properties.length}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg ${startIndex + 3 >= properties.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Comparison table */}
              <div className="p-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/4 p-2 text-left text-gray-600 font-medium">Features</th>
                      {visibleProperties.map((property) => (
                        <th key={property.id} className="p-2 text-center">
                          <div className="flex flex-col items-center">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-32 h-24 object-cover rounded-lg mb-2"
                            />
                            <h3 className="font-bold text-indigo-700">{property.title}</h3>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <React.Fragment key={category.name}>
                        <tr>
                          <td
                            colSpan={visibleProperties.length + 1}
                            className="bg-indigo-50 p-2 font-semibold text-indigo-800"
                          >
                            {category.name}
                          </td>
                        </tr>
                        {category.fields.map((field) => (
                          <tr key={field} className="border-b border-gray-100">
                            <td className="p-3 text-gray-700 font-medium capitalize">
                              {field === 'isBooked' ? 'Status' : field}
                            </td>
                            {visibleProperties.map((property) => (
                              <td key={`${property.id}-${field}`} className="p-3 text-center">
                                {formatValue(property, field)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end space-x-4">
          {visibleProperties.map((property) => (
            <motion.button
              key={property.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onViewProperty(property.id)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
            >
              View {property.title}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyComparison;