import React, { useEffect, useRef, useState } from 'react';

function Appointment() {
  const [fadeIn, setFadeIn] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fadeIn) {
            setFadeIn(true);
            observerInstance.disconnect(); 
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect(); 
    };
  }, [fadeIn]);

  return (
    <div
      className={`appointmentSection ${fadeIn ? 'fadeIn' : ''}`}
      ref={sectionRef}
    >
      <div className="appointmentContainer">
        <div className="appointmentFormWrapper">
          <div className="appointmentHeader">
            <span className="appointmentSubTitle">BOOK AN APPOINTMENT</span>
            <h2 className="appointmentTitle">
              <span className='smilecolor'>Effortless Online Booking</span><br />for Your Dental Visit
            </h2>
          </div>
          <form className="appointmentForm">
            <div className="appointmentField">
              <label className="appointmentLabel">Your Name *</label>
              <input className="appointmentInput" type="text" placeholder="Ex. William Smith" required />
            </div>
            <div className="appointmentField">
              <label className="appointmentLabel">Phone Number *</label>
              <input className="appointmentInput" type="tel" placeholder="Enter Phone Number" required />
            </div>
            <div className="appointmentField">
              <label className="appointmentLabel">Preferred Date*</label>
              <input className="appointmentInput" type="date" required />
            </div>
            <div className="appointmentField">
              <label className="appointmentLabel">Preferred Time*</label>
              <input className="appointmentInput" type="time" required />
            </div>
            <div className="appointmentField appointmentFieldFull">
              <label className="appointmentLabel">Special Requests or Notes *</label>
              <textarea className="appointmentInput" rows={3} placeholder="Enter here.." required />
            </div>
            <div className="appointmentField appointmentFieldFull">
              <button className='buttonPrimary'>
                <span>Book an Appointment</span>
              </button>
            </div>
          </form>
        </div>

        <div className="appointmentInfoWrapper">
          <div className="clinicHoursCard">
            <div className="clinicHoursTitle">Clinic Hours</div>
            <div className="clinicHoursRow">
              <span>Monday to Friday</span>
              <span>09:00 - 22:00</span>
            </div>
            <div className="clinicHoursRow">
              <span>Saturday</span>
              <span>11:00 - 20:00</span>
            </div>
            <div className="clinicHoursRow">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
          <div className="emergencyCard">
            <div className="emergencySub">Contact Us</div>
            <div className="emergencyPhone">
              <i className="fa-regular fa-envelope"></i>
              contact@marianapavelescu.be
            </div>
            <div className="emergencyPhone">
              <i className="fa-solid fa-phone"></i>
              (+32) 445 14 89 26
            </div>
            <div className="emergencyPhone">
              <i className="fa-solid fa-location-dot"></i>
              Chaussée de Wavre 1155,<br /> 1160 Auderghem, Bruxelles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
