import React, { useEffect, useState } from 'react';
import './MatchHighlights.css';

const API_KEY = 'AIzaSyBMxqyrk5aYxo6pXcSbC_W_xROcSLiuK3o';

export default function MatchHighlights() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('cricket match highlights 2025');
  const [inputValue, setInputValue] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVideos = (term = searchTerm, pageToken = '') => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        term
      )}&type=video&maxResults=8&key=${API_KEY}&pageToken=${pageToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (pageToken) {
          setVideos((prev) => [...prev, ...data.items]);
        } else {
          setVideos(data.items);
        }
        setSearchTerm(term);
        setNextPageToken(data.nextPageToken || '');
        setLoading(false);
      })
      .catch((err) => {
        console.error('YouTube API Error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchVideos(inputValue.trim());
    }
  };

  return (
    <section className="highlights-section">
      <h2 className="highlights-title">🎬 Match Highlights</h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search highlights (e.g. India vs Pakistan)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="highlights-grid">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="highlight-card"
            onClick={() =>
              window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')
            }
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="highlight-thumbnail"
            />
            <div className="highlight-info">
              <h4 className="highlight-video-title">{video.snippet.title}</h4>
              <p className="highlight-channel">{video.snippet.channelTitle}</p>
              <p className="highlight-date">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {nextPageToken && (
        <button
          className="load-more-btn"
          onClick={() => fetchVideos(searchTerm, nextPageToken)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </section>
  );
}
