import React, { useEffect, useState, useCallback } from 'react';

const MatchHighlights = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = useCallback(() => {
    const query = 'IPL 2025 match highlights';
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}&maxResults=6`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((err) => console.error("Failed to fetch videos:", err));
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div>
      <h2>🎥 Match Highlights</h2>
      <div className="highlight-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="highlight-card">
            <iframe
              width="100%"
              height="200"
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
