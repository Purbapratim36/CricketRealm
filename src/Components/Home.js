import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import img4 from './images/img4.jpg';
import img5 from './images/img5.jpg';
import img6 from './images/img6.jpg';
import img7 from './images/img7.jpg';





const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const patternsRef = useRef(null);

  const slides = [
    { id: 1, image: img1 },
    { id: 2, image: img2},
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 }
  ];

  useEffect(() => {
    const slideshowInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    const createPatterns = () => {
      const container = patternsRef.current;
      if (!container) return;

      container.innerHTML = '';

      for (let i = 0; i < 15; i++) {
        const pattern = document.createElement('div');
        pattern.classList.add('pattern');

        const types = ['circle', 'line', 'triangle', 'wave'];
        const type = types[Math.floor(Math.random() * types.length)];
        pattern.classList.add(type);

        const size = Math.random() * 100 + 20;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;

        pattern.style.width = `${size}px`;
        pattern.style.height = `${size}px`;
        pattern.style.left = `${left}%`;
        pattern.style.top = `${top}%`;
        pattern.style.transform = `rotate(${rotation}deg)`;
        pattern.style.opacity = Math.random() * 0.1 + 0.05;

        container.appendChild(pattern);
      }

      // Add cricket ball with fire effect
      const cricketBall = document.createElement('div');
      cricketBall.classList.add('cricket-ball-fire');
      container.appendChild(cricketBall);
    };

    createPatterns();
    window.addEventListener('resize', createPatterns);

    return () => {
      clearInterval(slideshowInterval);
      window.removeEventListener('resize', createPatterns);
    };
  }, [slides.length]);

  return (
    <div className="hero-container">
      {/* New background image layer - added this div */}
      <div className="page-background"></div>
      
      <div className="background-patterns" ref={patternsRef}></div>
      <div className="decor-dots"></div>

      <div className="hero-content">
        <div className="hero-left">
       
          <h1 className="main-heading">
            <span>Explore</span>
            <span>Cricket</span>
            <span>Like Never</span>
            <span>Before</span>
          </h1>
          <p className="sub-heading">
            Dive into the biggest cricketing moments, player insights, blogs, and live updates — all in one place.
          </p>
          <button className="explore-btn" onClick={() => navigate('/explore')}>
            Explore Now
          </button>
        </div>

        <div className="hero-right">
          <div className="image-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slideshow ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
            <div className="overlay"></div>
          </div>

          <div className="image-footer">
            <div className="hero-number">01</div>
            <p className="hero-description">Fantasy picks, trivia & match insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;