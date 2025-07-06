import { useEffect } from 'react';
import tooth from './../assets/img/smiling tooth.png';
import shield from './../assets/img/tootha.png';
import relax from './../assets/img/relax.png';

function Second({ setCursorVariant }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const diamondElements = document.querySelectorAll('.diamond');

      const triggerPoint = 0.8 * viewportHeight;

      diamondElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();

        if (scrollPosition > triggerPoint) {
          const scrollMultiplier = 0.2;

          const offset = -(scrollPosition - triggerPoint) * (scrollMultiplier + index * 0.05);

          element.style.transform = `translateY(${offset}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const diamondElements = document.querySelectorAll('.diamond');

    setTimeout(() => {
      diamondElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 300); 
      });
    }, 1000);

    return () => {};
  }, []);

  return (
    <div className='diamondContainer'>
      <div className='diamondWrapper'>
        <div className='diamond diamond1'>
          <div className='Card'>
            <img src={tooth} alt='Tooth' />
            <span className='title'>Personalized Dental Care</span>
            <span className='description'>Every patient is unique, and so is their care. From tailored treatment plans to advanced technology, we’ll ensure your smile gets the attention it deserves, every step of the way.</span>
          </div>
        </div>
        <div className='diamond diamond2'>
          <div className='Card'>
            <img src={relax} alt='Relax' />
            <span className='title'>Stress-Free Experience</span>
            <span className='description'>We’ve redefined dental visits with our gentle approach, soothing environment, and patient-focused care. Relax — we’ve got you covered.</span>
          </div>
        </div>
        <div className='diamond diamond3'>
          <div className='Card'>
            <img src={shield} alt='Shield' />
            <span className='title'>Excellence You Can Trust</span>
            <span className='description'>We take pride in delivering exceptional care with long-lasting results. With top-tier materials and expertise, we provide treatments you can rely on for years to come.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;
