import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="left-section">
        <div className="intro-label">We Are</div>
        <h1 className="main-headline">
          <i>Specialists in</i> <strong>fantasy cricket</strong> <strong>technology & insights</strong>
        </h1>
        <hr className="separator" />
        <p className="highlight">
          Cricket Realm is built by passionate fans, analysts, and developers who live and breathe cricket.
        </p>
        <p className="description">
          We're not here to sell buzzwords. Our mission is to give fantasy cricket enthusiasts the sharpest tools, cleanest UI, and real insights.
        </p>
      </div>

      <div className="right-section">
        <div className="info-block">
          <h3>⚡ Real-time fantasy building logic</h3>
          <hr />
          <p>Draft your team with dynamic player stats, filters, and validations.</p>
        </div>

        <div className="info-block">
          <h3>🏏 Deep match and player analytics</h3>
          <hr />
          <p>Access curated stats, credit scores, and pick percentages like a pro.</p>
        </div>

        <div className="info-block">
          <h3>🌐 Designed for all cricket fans</h3>
          <hr />
          <p>Whether you're a casual picker or a fantasy guru, we've got you covered.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
