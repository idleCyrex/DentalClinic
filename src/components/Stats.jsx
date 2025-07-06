import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 1500, start = 0, startCounting = false) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!startCounting) {
      setCount(start);
      return;
    }
    let rafId;
    let startTime = null;
    let end = parseInt(target, 10) || 0;
    if (isNaN(end)) end = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setCount(progress < 1 ? value : end);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    setCount(start);
    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start, startCounting]);

  return count;
}

function Stats() {
  const [patients, setPatients] = useState('...');
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 1995;

  const duration = 1500;
  const animatedYears = useCountUp(yearsOfExperience, duration, 0, inView);
  const animatedPatients = useCountUp(
    isNaN(Number(patients)) ? 0 : Number(patients),
    duration,
    0,
    inView
  );

  useEffect(() => {
    fetch('https://corsproxy.io/?https://medsys.strumfii-dent.ro/rezultat.txt')
      .then(res => res.text())
      .then(data => setPatients(data.trim()))
      .catch(() => setPatients('N/A'));
  }, []);

  useEffect(() => {
    const ref = statsRef.current;
    if (!ref) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, []);

  return (
    <>

      <div className='statsSection' ref={statsRef}>
        <div className='statsWrapper'>
          <div className='statsCard'>
            <span className='color1 titleCardStats'>Years of experience 🧑‍⚕️</span>
            <span className='descriptionCardStats'>{animatedYears}</span>
          </div>
          <div className='line'></div>
          <div className='statsCard'>
            <span className='color2 titleCardStats2'>Happy patients 😁</span>
            <span className='descriptionCardStats'>
              {isNaN(Number(patients)) ? patients : animatedPatients}
            </span>
          </div>
          <div className='line'></div>
          <div className='statsCard'>
            <span className='color3 titleCardStats3'>Google review rating ⭐</span>
            <span className='descriptionCardStats'>4.8/5</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;