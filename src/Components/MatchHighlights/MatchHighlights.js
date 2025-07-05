import React, { useEffect, useState, useCallback } from 'react';
import './MatchHighlights.css';

const MatchHighlights = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('IPL 2025 match highlights');

  const fetchVideos = useCallback(() => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}&maxResults=6`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((err) => console.error('Error fetching videos:', err));
  }, [searchQuery]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <div className="highlight-page">
      <h2 className="highlight-title">🎥 Match Highlights</h2>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search highlights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="highlight-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="highlight-card">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHighlights;
