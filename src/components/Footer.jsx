import React from "react";

function Footer() {
  return (
    <div className="footerBackground">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path fill="#f0fbfd" fillOpacity="1"
     d="M0,224L80,208C160,192,320,160,480,176C640,192,800,256,960,272C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
    </path>
    </svg>
    <div className="newsLetterWrapper">
    <span className="newsletter-title">OUR NEWSLETTER</span>
    <span className="newsletter-heading">
        <b>Subscribe to Our Newsletter for<br />
        the <span className="newsletter-highlight">Latest Updates and Offers</span>
        </b>
    </span>
    <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
        <div className="newsletter-input-wrapper">
        <input
            type="email"
            className="newsletter-input"
            placeholder="Enter Email Address"
            required
        />
        </div>
        <button className="newsletter-btn" type="submit">Subscribe</button>
    </form>
    </div>
    <footer className="footerWrapper">

      <div className="footerContent">
        <div className="footerBrand">
          <div className="footerTitle">Dr. Mariana Pavelescu</div>
          <div className="footerSubtitle">
            We love working with ambitious people.<br />
            Let’s build your best smile together.
          </div>
        </div>
        <div className="footerLinksContact">
          <div className="footerLinks">
            <div className="footerSectionTitle smilecolor">Links</div>
            <ul>
              <li><a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Services</a></li>
              <li><a href="#appointment" onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}>Appointment</a></li>
              <li><a href="#about" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a></li>
            </ul>
          </div>
          <div className="footerContact">
            <div className="footerSectionTitle smilecolor">Contact us</div>
            <ul>
              <li>
                <i className="fa-regular fa-envelope"></i>
                <a href="mailto:contact@marianapavelescu.be">contact@marianapavelescu.be</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+32445148926">+32 445 14 89 26</a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                Chaussée de Wavre 1155,<br/> 1160 Auderghem, Bruxelles
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footerBottomBar">
        <span>© {new Date().getFullYear()} Dr. Mariana Pavelescu - All rights reserved</span>
        <span>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        </span>
      </div>
    </footer>
    </div>
  );
}

export default Footer;