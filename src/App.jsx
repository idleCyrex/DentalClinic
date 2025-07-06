import React from 'react';
import './assets/style.css';
import './assets/background.css';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Second from './components/Second';
import Blank from './components/Blank';
import About from "./components/About.jsx";
import Appointment from './components/Appointment.jsx';
import Stats from './components/Stats.jsx';
import Services from './components/Services.jsx';
import Footer from './components/Footer.jsx';
import Reviews from './components/Reviews.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <div id="reviews">
        <Reviews />
      </div>
      <div id="appointment">
        <Appointment />
      </div>
      <Footer />
    </div>
  );
}

export default App;