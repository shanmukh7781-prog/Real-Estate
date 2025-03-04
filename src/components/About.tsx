import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Shield, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Shanmukh Estates
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Building trust and delivering excellence in real estate since 2025. We are committed to helping you find the perfect plot for your dream home.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 mb-6">
              At Shanmukh Estates, we envision creating premium living spaces that enhance quality of life. Our mission is to provide exclusive plots in strategic locations with excellent investment potential and future growth.
            </p>
            <p className="text-gray-600 mb-6">
              We believe in transparency, integrity, and customer satisfaction. Our team of experts is dedicated to guiding you through every step of your property investment journey.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-indigo-900">Premium Quality</h4>
                </div>
                <p className="text-gray-600 text-sm">Only the finest plots in prime locations</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-indigo-900">Expert Team</h4>
                </div>
                <p className="text-gray-600 text-sm">Professional guidance at every step</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-indigo-900">Secure Investment</h4>
                </div>
                <p className="text-gray-600 text-sm">Legal clarity and documentation support</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-indigo-900">Growth Potential</h4>
                </div>
                <p className="text-gray-600 text-sm">Properties with excellent ROI</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-indigo-600 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-indigo-100">
                    <span className="font-medium text-white">Premium Locations:</span> All our plots are in strategic locations with excellent connectivity and amenities.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-indigo-100">
                    <span className="font-medium text-white">Legal Clarity:</span> All properties come with clear titles and complete documentation support.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-indigo-100">
                    <span className="font-medium text-white">Transparent Dealings:</span> No hidden costs or surprise charges. What you see is what you get.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-indigo-100">
                    <span className="font-medium text-white">Customer Support:</span> Dedicated assistance before, during, and after your purchase.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-indigo-100">
                    <span className="font-medium text-white">Investment Advisory:</span> Expert guidance on property selection based on your investment goals.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;