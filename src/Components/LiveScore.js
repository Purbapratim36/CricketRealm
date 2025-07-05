import React, { useEffect, useState, useCallback } from 'react';

const MatchHighlights = () => {
  const [videos, setVideos] = useState([]);

  // ✅ Wrap fetchVideos in useCallback so it doesn't change every render
  const fetchVideos = useCallback(() => {
    // Replace this with your actual fetching logic
    fetch('https://example.com/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error(err));
  }, []); // Empty dependency ensures stable reference

  useEffect(() => {
    fetchVideos(); // This is now safe
  }, [fetchVideos]); // ✅ useEffect is happy now

  return (
    <div>
      <h2>Match Highlights</h2>
      {videos.map((video, index) => (
        <div key={index}>
          <h3>{video.title}</h3>
          <video src={video.url} controls />
        </div>
      ))}
    </div>
  );
};

export default MatchHighlights; 
