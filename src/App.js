import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import BlogList from './Components/BlogList';
import TriviaBattle from './Components/TriviaBattle';
import LiveScore from './Components/LiveScore';
import News from './Components/News';
import Explore from './Components/Explore';
import About from './Components/About';
import Footer from './Components/Footer';
import FantasyCricket from './Components/FantasyCricket/FantasyCricket';
import MatchPredictor from './Components/MatchPredictor/MatchPredictor';
import MatchHighlights from './Components/MatchHighlights/MatchHighlights';
import MyProfile from './Components/MyProfile';






// Fix 1: Correct FantasyCricket import (assuming default export)


// Styles
import './Components/NavigationBar.css';
import './Components/Home.css';
import './Components/Explore.css';
import './Components/TriviaBattle.css'; 
import './Components/LiveScore.css';
import './App.css';
import './Components/About.css';

// Fix 2: Verify this path matches your actual firebase service location


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <NavigationBar />
        
        <div className="main-content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/trivia-battle" element={<TriviaBattle />} />
            <Route path="/livescore" element={<LiveScore />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<MyProfile />} />
            
            {/* Fix 3: Use consistent lowercase path */}
            <Route path="/fantasy" element={<FantasyCricket />} />
            <Route path="/match-predictor" element={<MatchPredictor />} />
            <Route path="/match-highlights" element={<MatchHighlights />} />
            
            
            
            
            
            <Route 
              path="/contact" 
              element={
                <div className="coming-soon-page">
                  <h3>Contact Page Coming Soon</h3>
                </div>
              } 
            />
            
            <Route 
              path="*" 
              element={
                <div className="not-found-page">
                  <h4>404 - Page Not Found</h4>
                </div>
              } 
            />
          </Routes>
        </div>
        
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
