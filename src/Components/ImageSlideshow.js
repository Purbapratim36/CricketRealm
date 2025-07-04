import React, { useState, useEffect } from 'react';

const ImageSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Cricket images for slideshow
  const slides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 4, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ];

  useEffect(() => {
    // Slideshow interval
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
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
  );
};

export default ImageSlideshow;