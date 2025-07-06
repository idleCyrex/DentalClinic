import React, { useState, useEffect, useRef } from 'react';
import Prosthetics from './../assets/img/Prost.png';
import Endo from './../assets/img/endo.png';
import General from './../assets/img/Right-Image-6.jpg';
import EndoIcon from './../assets/img/endoicon.png';
import RadioIcon from './../assets/img/radioicon.png';
import GeneralIcon from './../assets/img/generalicon.png';
import ProstIcon from './../assets/img/prosticon.png';
import Pedodontics from './../assets/img/PedodonticsIcon.png';
import Radio from './../assets/img/radio.png';
import PedodonticsBG from './../assets/img/Pedodontics.png';

const topServices = [
  {
    img: General,
    icon: GeneralIcon,
    iconAlt: "General Icon",
    title: "General Dentistry",
    description:
      "Clean, welcoming care for the whole family. Think smiling patients, check ups in progress, and a friendly dentist in a modern office conveying trust, warmth, and professionalism.",
  },
  {
    img: Prosthetics,
    icon: ProstIcon,
    iconAlt: "Prosthetics Icon",
    title: "Prosthetics",
    description:
      "We restore smiles with custom crowns, bridges, and dentures that look natural and last. Ideal images: a dental prosthetic on a model or in a mouth, a dentist adjusting a crown, or a confident, smiling patient.",
  },
  {
    img: Endo,
    icon: EndoIcon,
    iconAlt: "Endodontics Icon",
    title: "Endodontics",
    description:
      "Comfort focused root canal treatments delivered with skill and care. Suggested visuals: a calm treatment scene, endodontic tools, or a focused dentist at work emphasizing relief and professionalism.",
  },
];

const bottomServices = [
  {
    img: Radio, 
    icon: RadioIcon,
    iconAlt: "Radiology Icon",
    title: "Radiology",
    description:
      "High tech dental imaging for accurate diagnostics. Show a panoramic X-ray in use, X-ray scans on a screen, or a dentist reviewing digital images. The tone: modern, precise, clinical.",
  },
  {
    img: PedodonticsBG, 
    icon: Pedodontics,
    iconAlt: "Pedodontics Icon",
    title: "Pedodontics",
    description:
      "Friendly, gentle care just for kids. We create a safe, fun space where children feel at ease and build healthy habits. Images could show a smiling child, a warm dentist child interaction, or a colorful treatment room.",
  },
];

function Services() {
  const [expanded, setExpanded] = useState([false, false, false, false, false]);
  const [fadeInStage, setFadeInStage] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const servicesRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInViewport(true);
        });
      },
      { threshold: 0.1 }
    );
    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
    };
  }, []);

  useEffect(() => {
    if (isInViewport) {
      const timeouts = [
        setTimeout(() => setFadeInStage(1), 200),
        setTimeout(() => setFadeInStage(2), 500),
        setTimeout(() => setFadeInStage(3), 900),
      ];
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isInViewport]);

  const handleToggle = idx => {
    setExpanded(prev =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  const allServices = [...topServices, ...bottomServices];

  const [page, setPage] = useState(0);
  const totalPages = allServices.length;

  const handlePageChange = (idx) => {
    if (idx >= 0 && idx < totalPages) setPage(idx);
  };

  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = (e) => {
    if (!dragging) return;
    const endX = e.type === "touchend"
      ? (e.changedTouches[0]?.clientX ?? 0)
      : e.clientX;
    const diff = endX - dragStartX;
    if (diff > 60) {
      handlePageChange(page - 1);
    } else if (diff < -60) {
      handlePageChange(page + 1);
    }
    setDragging(false);
    setDragStartX(null);
  };

  const [showAll, setShowAll] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const handleShowAll = () => {
    if (showAll) {
      setFadingOut(true);
      setTimeout(() => {
        setShowAll(false);
        setFadingOut(false);
      }, 400);
    } else {
      setShowAll(true);
    }
  };

  return (
    <>
      <div className="ourServicesWrapper" id="services" ref={servicesRef}>
        <div className={`ourServicesTop ${fadeInStage >= 1 ? 'fadeIn' : 'hidden'}`}>
          <div className="ourServicesContentLeft" >
            <span className="ourServicesTitle">OUR SERVICES</span>
            <span className="ourServicesSubTitle">
              <span className="smilecolor" >Personalized care and attention</span>
              <br />
              for your best smile.
            </span>
          </div>
          {!isMobile && (
            <div className="ourServicesContentRight" >
              <button
                className="custom-button"
                onClick={handleShowAll}
              >
                <span className="button-circle"></span>
                <span className="button-circle"></span>
                <span className="button-circle"></span>
                <span className="button-circle"></span>
                <span className="button-circle"></span>
                <span className="button-text">
                  {showAll ? "Show Less" : "Explore All"}
                </span>
              </button>
            </div>
          )}
        </div>
 
        {isMobile ? (
          <div className="services-mobile-wrapper" id="services">
            <button
              aria-label="Previous"
              className={`reviews-arrow mobile-arrow left services-mobile-arrow ${page === 0 ? "disabled" : ""}`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div
              className="services-cards-mobile"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onMouseLeave={() => setDragging(false)}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              <div
                className={`cardServices fadeIn`}
                key={allServices[page].title}
                draggable
                onDragStart={e => {
                  handleDragStart(e);
                  if (e.dataTransfer) {
                    const img = document.createElement("img");
                    img.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";
                    e.dataTransfer.setDragImage(img, 0, 0);
                  }
                }}
                onDragEnd={handleDragEnd}
              >
                <div className="cardServicesImage">
                  <img src={allServices[page].img} alt={`Service${page + 1}`} />
                </div>
                <div className="cardServicesIconWrapper">
                  <div className="cardServicesIconWrapperRRRR">
                    <img
                      src={allServices[page].icon}
                      alt={allServices[page].iconAlt}
                      className="cardServicesIcon icon-white"
                    />
                  </div>
                </div>
                <div className="cardServicesContent cardServicesContent-mobile">
                  <span className="cardServicesTitle">{allServices[page].title}</span>
                  <span className="cardServicesDescription">
                    {expanded[page] || allServices[page].description.length <= 100
                      ? allServices[page].description
                      : allServices[page].description.slice(0, 100) + '...'}
                  </span>
                  {allServices[page].description.length > 100 && (
                    <button
                      className="learn-more-btn"
                      onClick={() => handleToggle(page)}
                    >
                      {expanded[page] ? (
                        <>
                          Show Less <i className="fa-solid fa-arrow-left" style={{ marginLeft: 4 }}></i>
                        </>
                      ) : (
                        <>
                          Learn More <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }}></i>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button
              aria-label="Next"
              className={`reviews-arrow mobile-arrow right services-mobile-arrow ${page === totalPages - 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        ) : (
          <>
            <div className="ourServicesBottom">
              {topServices.map((service, idx) => (
                <div
                  className={`cardServices ${fadeInStage >= 2 ? 'fadeIn' : 'hidden'}`}
                  key={service.title}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className="cardServicesImage">
                    <img src={service.img} alt={`Service${idx + 1}`} />
                  </div>
                  <div className="cardServicesIconWrapper">
                    <div className="cardServicesIconWrapperRRRR">
                      <img
                        src={service.icon}
                        alt={service.iconAlt}
                        className="cardServicesIcon icon-white"
                      />
                    </div>
                  </div>
                  <div className="cardServicesContent" style={{ position: 'relative', height: '100%' }}>
                    <span className="cardServicesTitle">{service.title}</span>
                    <span className="cardServicesDescription">
                      {expanded[idx] || service.description.length <= 100
                        ? service.description
                        : service.description.slice(0, 100) + '...'}
                    </span>
                    {service.description.length > 100 && (
                      <button
                        className="learn-more-btn"
                        onClick={() => handleToggle(idx)}
                      >
                        {expanded[idx] ? (
                          <>
                            Show Less <i className="fa-solid fa-arrow-left" style={{ marginLeft: 4 }}></i>
                          </>
                        ) : (
                          <>
                            Learn More <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }}></i>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {(showAll || fadingOut) && (
              <div
                className={`ourServicesBottom ${fadingOut ? 'fadeOut' : (fadeInStage >= 3 ? 'fadeIn' : 'hidden')}`}
                style={{ marginTop: 30 }}
              >
                {bottomServices.map((service, idx) => (
                  <div
                    className={`cardServices ${fadeInStage >= 3 && !fadingOut ? 'fadeIn' : ''}`}
                    key={service.title}
                    style={{ transitionDelay: `${idx * 120}ms` }}
                  >
                    <div className="cardServicesImage">
                      <img src={service.img} alt={`Service${idx + 4}`} />
                    </div>
                    <div className="cardServicesIconWrapper">
                      <div className="cardServicesIconWrapperRRRR">
                        <img
                          src={service.icon}
                          alt={service.iconAlt}
                          className="cardServicesIcon icon-white"
                        />
                      </div>
                    </div>
                    <div className="cardServicesContent" style={{ position: 'relative', height: '100%' }}>
                      <span className="cardServicesTitle">{service.title}</span>
                      <span className="cardServicesDescription">
                        {expanded[idx + 3] || service.description.length <= 100
                          ? service.description
                          : service.description.slice(0, 100) + '...'}
                      </span>
                      {service.description.length > 100 && (
                        <button
                          className="learn-more-btn"
                          onClick={() => handleToggle(idx + 3)}
                        >
                          {expanded[idx + 3] ? (
                            <>
                              Show Less <i className="fa-solid fa-arrow-left" style={{ marginLeft: 4 }}></i>
                            </>
                          ) : (
                            <>
                              Learn More <i className="fa-solid fa-arrow-right" style={{ marginLeft: 4 }}></i>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {isMobile && (
          <div className="reviews-pagination fadeIn">
            {allServices.map((_, idx) => (
              <div
                key={idx}
                className={`reviews-dot${page === idx ? " reviews-dot-active" : ""}`}
                onClick={() => handlePageChange(idx)}
                style={{
                  cursor: "pointer",
                  background: page === idx ? "#50bbe8" : "#333"
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Services;