import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Properties from './components/Properties';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CinematicShowcase from './components/CinematicShowcase';
import Explore from './components/Explore';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <CinematicShowcase />
      <Explore />
      <Properties />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;