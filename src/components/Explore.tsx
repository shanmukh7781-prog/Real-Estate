import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building, MapPin, BarChart, Users, Star } from 'lucide-react';

const Explore: React.FC = () => {
  return (
    <section id="explore" className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Premium Real Estate
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why RK Adarsh Nagar is one of the most sought-after locations for premium real estate investment in India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Market Insights */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-4">
              <BarChart className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">Market Insights</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive analysis of property appreciation trends and investment opportunities in Bhimavaram.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span>15-20% Annual Appreciation</span>
              </li>
              <li className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Premium Location Rating</span>
              </li>
            </ul>
          </motion.div>

          {/* Infrastructure Development */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">Infrastructure</h3>
            </div>
            <p className="text-gray-600 mb-4">
              State-of-the-art infrastructure development and upcoming projects in the vicinity.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-500 mr-2" />
                <span>Smart City Development</span>
              </li>
              <li className="flex items-center">
                <Building className="h-5 w-5 text-indigo-500 mr-2" />
                <span>Modern Amenities</span>
              </li>
            </ul>
          </motion.div>

          {/* Community Features */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">Community</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Exclusive community features and neighborhood highlights that make this location special.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <Star className="h-5 w-5 text-indigo-500 mr-2" />
                <span>Premium Lifestyle</span>
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 text-indigo-500 mr-2" />
                <span>Elite Community</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="#properties"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Available Properties
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Explore;