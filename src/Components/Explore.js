import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaNewspaper, FaQuestionCircle, FaChartLine, FaUser, FaGlobe } from 'react-icons/fa';
import './Explore.css';

const features = [
  {
    title: 'Fantasy Builder',
    description: 'Build your ultimate fantasy cricket team and compete!',
    status: 'Launched',
    icon: <FaTrophy size={80} color="#00ff88" />,
    link: '/fantasy'
  },
  {
    title: 'Cricket Blog',
    description: 'Insights, match analysis, and fan opinions.',
    status: 'Launched',
    icon: <FaNewspaper size={80} color="#00ff88" />,
    link: '/blog'
  },
  {
    title: 'Trivia & Quiz',
    description: 'Test your cricket knowledge and win rewards.',
    status: 'Just Launched',
    icon: <FaQuestionCircle size={80} color="#00ff88" />,
    link: '/trivia-battle'
  },
  {
    title: 'Live Scores',
    description: 'Get real-time updates from all ongoing matches.',
    status: 'Launched',
    icon: <FaChartLine size={80} color="#00ff88" />,
    link: '/livescore'
  },
  {
    title: 'Player Profiles',
    description: 'Track player stats, history, and form.',
    status: 'Coming Soon',
    icon: <FaUser size={80} color="#00ff88" />,
    link: '/profiles'
  },
  {
    title: 'Cricket News',
    description: 'Stay up-to-date with global cricket headlines.',
    status: 'Launched',
    icon: <FaGlobe size={80} color="#00ff88" />,
    link: '/news'
  }
];

export default function Explore() {
  const [sliderRef, setSliderRef] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="explore-section">
      <h2 className="explore-heading">⚙️ Explore Features</h2>

      <div className="carousel-container">
        <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="card-wrapper">
              <div
                className="feature-card"
                onClick={() => navigate(feature.link)}
                style={{ cursor: 'pointer' }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div
                  className={`status ${
                    feature.status === 'Launched'
                      ? 'launched'
                      : feature.status === 'Just Launched'
                      ? 'justlaunched'
                      : 'comingsoon'
                  }`}
                >
                  {feature.status}
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button className="arrow prev" onClick={() => sliderRef.slickPrev()}>&larr;</button>
        <button className="arrow next" onClick={() => sliderRef.slickNext()}>&rarr;</button>
      </div>
    </div>
  );
}
