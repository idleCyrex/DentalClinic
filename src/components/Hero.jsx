import { useState, useEffect } from 'react';
import tooth from './../assets/img/tooth.png';
import mariana from './../assets/img/MarianaPhoto.png';
import Navbar from './Navbar';
import girl from './../assets/img/bgimghome.png'
function Hero({ setCursorVariant }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fadeInStage, setFadeInStage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleMouseEnter = (size) => {
    if (size === 'large') {
      setCursorVariant('verticalLineLarge');
    } else if (size === 'medium') {
      setCursorVariant('verticalLineMedium');
    } else {
      setCursorVariant('verticalLineSmall');
    }
  };

  const handleMouseLeave = () => {
    setCursorVariant('default');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setFadeInStage(1), 500),
      setTimeout(() => setFadeInStage(2), 750),
      setTimeout(() => setFadeInStage(3), 1000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDesktopHero = () => (
    <div className="heroWrapper">
      <div
        className="leftHeroWrapper"
        style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}
      >
        <div
          className={`leftHeroWrapperText1 ${
            fadeInStage >= 2 ? 'fadeIn' : 'hidden'
          }`}
        >
          <span>
            Your Smile<br />
            is Our Superpower<br />
            Let's Perfect<br />
            It Together!
          </span>
        </div>
        <div
          className={`leftHeroWrapperText2 ${
            fadeInStage >= 3 ? 'fadeIn' : 'hidden'
          }`}
        >
          <div className="leftHeroWrapperImg">
            <img src={tooth} alt="tooth" />
          </div>
          <span>
            We are a dental office, founded<br />
            and led by Dr. Mariana Pavelescu,<br />
            a dedicated dentist with vast experience<br />
            and a special passion for dental care.
          </span>
        </div>
      </div>
      <div
        className={`rightHeroWrapper ${
          fadeInStage >= 1 ? 'fadeIn' : 'hidden'
        }`}
      >
        <img src={mariana} alt="mariana" />
      </div>
    </div>
  );

  const renderMobileHero = () => (
    <div className="heroWrapperMobile">
      <div className="mobileHeroCard">
        <div className={`mobileHeroTitle ${fadeInStage >= 1 ? 'fadeIn' : 'hidden'}`}>
          Book Your Appointment<br />in a Few Minutes
        </div>
        <div className={`mobileHeroSubtitle ${fadeInStage >= 2 ? 'fadeIn' : 'hidden'}`}>
          Take the first step toward dental<br />wellness. Reserve your spot with us today!
        </div>
        <button
          className={`custom-button margin0 ${fadeInStage >= 3 ? 'fadeIn' : 'hidden'}`}
          onClick={() => {
            const el = document.getElementById('appointment');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="button-circle"></span>
          <span className="button-circle"></span>
          <span className="button-circle"></span>
          <span className="button-circle"></span>
          <span className="button-circle"></span>
          <span className="button-text">Appointment</span>
        </button>
        <img
          src={girl}
          alt="mariana"
          className={`mobileHeroImage ${fadeInStage >= 3 ? 'fadeIn' : 'hidden'}`}
        />
      </div>
    </div>
  );

  return isMobile ? renderMobileHero() : renderDesktopHero();
}

export default Hero;