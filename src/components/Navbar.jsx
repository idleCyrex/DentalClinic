import React, { useEffect, useState } from 'react';

function Navbar({ setCursorVariant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className={`navbarContainer${isSticky ? ' sticky' : ''}${mobileMenuOpen ? ' mobile-menu-active' : ''}`}>
      <div className={`navbarWrapper${isSticky ? ' sticky' : ''}${mobileMenuOpen ? ' mobile-menu-active' : ''}`}>
        <div className='navbarleft'>
          {!mobileMenuOpen && (
            <span className='cursive'>
              Dr. Mariana Pavelescu
            </span>
          )}
        </div>
        <div className='navbarRight'>
          <div className='navbarLinksWrapper desktop-only'>
            <a
              href="#home"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}

            >
              Home
            </a>
            <a
              href="#about"
              onClick={e => { e.preventDefault(); scrollToSection('about'); }}
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={e => { e.preventDefault(); scrollToSection('services'); }}
            >
              Services
            </a>


          </div>
          <button
            className="custom-button desktop-only"
            onClick={e => { e.preventDefault(); scrollToSection('appointment'); }}

          >
            <span className="button-circle"></span>
            <span className="button-circle"></span>
            <span className="button-circle"></span>
            <span className="button-circle"></span>
            <span className="button-circle"></span>
            <span className="button-text">Appointment</span>
          </button>
          <button
            className={`hamburger mobile-only${mobileMenuOpen ? ' open' : ''}`}
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            <span className="mobile-menu-title">Dr. Mariana Pavelescu</span>
            <a href="#home" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>Home</a>
            <a href="#about" onClick={e => { e.preventDefault(); scrollToSection('about'); setMobileMenuOpen(false); }}>About Us</a>
            <a href="#services" onClick={e => { e.preventDefault(); scrollToSection('services'); setMobileMenuOpen(false); }}>Services</a>
            <a href="#appointment" onClick={e => { e.preventDefault(); scrollToSection('appointment'); setMobileMenuOpen(false); }}>Appointment</a>
            <button
              className="custom-button"
              style={{ marginTop: '30px' }}
              onClick={e => { e.preventDefault(); scrollToSection('appointment'); setMobileMenuOpen(false); }}
            >
              <span className="button-text">Appointment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
