import React, { useState, useEffect, useRef } from 'react';
import dental from './../assets/img/toothimg.png';
import Stats from './Stats';

function About() {
    const [fadeInStage, setFadeInStage] = useState(0);
    const [isInViewport, setIsInViewport] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsInViewport(true);
                });
            },
            { threshold: 0.1 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => {
            if (aboutRef.current) observer.unobserve(aboutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isInViewport) {
            const timeouts = [
                setTimeout(() => setFadeInStage(1), 300),   // Tooth image
                setTimeout(() => setFadeInStage(2), 700),   // Text
                setTimeout(() => setFadeInStage(3), 1100),  // Stats
            ];
            return () => timeouts.forEach(clearTimeout);
        }
    }, [isInViewport]);

    return (
        <div className="about-wrapper-svg" ref={aboutRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f0fbfd" fillOpacity="1" id="about"
                      d="M0,224L80,208C160,192,320,160,480,176C640,192,800,256,960,272C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <div className="about-wrapper" >
                <div className='abWrapper'>
                    <div className='aboutImageContainer'>
                        <img
                            src={dental}
                            alt="Dental Image"
                            className={fadeInStage >= 1 ? 'fadeIn' : 'hidden'}
                        />
                        <div className={`aboutTextContainer ${fadeInStage >= 2 ? 'fadeIn' : 'hidden'}`}>
                            <span className='titleAboutUsTextC'>ABOUT US</span>
                            <span className='secTitleAboutUs'>Where Your <span className="smilecolor">Smile</span> Feels at Home</span>
                            <div className='aboutTextWrappera'>
                                <span>Led by <span className="smilecolor">Dr. Mariana Pavelescu</span>, our dental office is all about comfort, care, and connection. We’ve created a space where you can feel at ease, knowing you're getting <span className="smilecolor">personalized dental care</span> that puts your well being first. Whether it’s your first visit or your fiftieth, we’re here to make your experience smooth, friendly, and tailored to you.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`AboutStatstats ${fadeInStage >= 3 ? 'fadeIn' : 'hidden'}`}>
                    <Stats/>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#f0fbfd" fillOpacity="1"
                      d="M0,64L80,80C160,96,320,128,480,133.3C640,139,800,117,960,117.3C1120,117,1280,139,1360,149.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
        </div>
    );
}

export default About;