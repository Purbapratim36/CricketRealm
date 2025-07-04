// src/Components/MatchPredictor/MatchPredictor.js

import React, { useEffect, useState } from 'react';
import { fetchLiveMatches, fetchMatchDetails } from './matchService';
import './MatchPredictor.css';

export default function MatchPredictor() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveMatches()
      .then((data) => {
        const live = data.filter((m) => m.matchStarted && m.matchType !== 't20i');
        setMatches(live.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="predictor-container">
      <h2>🏏 Live Match Predictor</h2>
      {loading && <p>Loading...</p>}
      {!loading && matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}

function MatchCard({ match }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetchMatchDetails(match.id).then(setDetails);
  }, [match.id]);

  const getPrediction = () => {
    if (!details) return 50;
    const team1Runs = details.score?.[0]?.r ?? 0;
    const team2Runs = details.score?.[1]?.r ?? 0;
    const total = team1Runs + team2Runs || 1;
    return Math.floor((team1Runs / total) * 100);
  };

  const winPercent = getPrediction();

  const team1 = match.teams?.[0] || 'Team A';
  const team2 = match.teams?.[1] || 'Team B';
  const logo1 = match.teamInfo?.[0]?.img || '/images/team1.png';
  const logo2 = match.teamInfo?.[1]?.img || '/images/team2.png';

  return (
    <div className="match-card">
      <div className="match-header">
        <strong>{match.name}</strong>
        <span className="status">{match.status}</span>
      </div>

      <div className="teams">
        <div className="team d-flex align-items-center">
          <img src={logo1} alt={team1} className="team-logo" />
          {team1}
        </div>
        <div className="vs text-muted">vs</div>
        <div className="team d-flex align-items-center">
          <img src={logo2} alt={team2} className="team-logo" />
          {team2}
        </div>
      </div>

      <div className="predict-bar">
        <div className="bar team1" style={{ width: `${winPercent}%` }}>{winPercent}%</div>
        <div className="bar team2" style={{ width: `${100 - winPercent}%` }}>{100 - winPercent}%</div>
      </div>
    </div>
  );
}
