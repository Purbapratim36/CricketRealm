import React, { useEffect } from 'react';
import './BackgroundPatterns.css';

const BackgroundPatterns = () => {
  useEffect(() => {
    const createPatterns = () => {
      const container = document.querySelector('.background-patterns');
      container.innerHTML = '';
      
      // Create abstract patterns
      for (let i = 0; i < 15; i++) {
        const pattern = document.createElement('div');
        pattern.classList.add('pattern');
        
        // Random pattern types
        const types = ['circle', 'line', 'triangle', 'wave'];
        const type = types[Math.floor(Math.random() * types.length)];
        pattern.classList.add(type);
        
        // Random position and size
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
    };
    
    createPatterns();
    window.addEventListener('resize', createPatterns);
    
    return () => {
      window.removeEventListener('resize', createPatterns);
    };
  }, []);

  return <div className="background-patterns"></div>;
};

export default BackgroundPatterns;