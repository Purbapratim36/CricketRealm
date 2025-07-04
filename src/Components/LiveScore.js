import React, { useEffect, useState } from 'react';
import './LiveScore.css';

export default function Livescore() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/current', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const allMatches = data?.typeMatches?.flatMap(typeMatch => typeMatch?.seriesMatches || []);
        const cards = allMatches?.flatMap(series =>
          series?.seriesAdWrapper?.matches?.map(match => {
            const team1Name = match?.matchInfo?.team1?.teamName || 'TBD';
            const team2Name = match?.matchInfo?.team2?.teamName || 'TBD';
            const team1Abbr = match?.matchInfo?.team1?.teamSName || '';
            const team2Abbr = match?.matchInfo?.team2?.teamSName || '';
            const matchFormat = match?.matchInfo?.matchFormat || '';
            const seriesName = match?.matchInfo?.seriesName || '';

            const matchTitle = `${team1Abbr} vs ${team2Abbr} - ${matchFormat} - (${seriesName})`;

            const score1Innings = match?.matchScore?.team1Score?.inngs1;
            const score2Innings = match?.matchScore?.team2Score?.inngs1;

            const score1 = score1Innings
              ? `${score1Innings.runs}/${score1Innings.wickets} (${score1Innings.overs})`
              : '-';
            const score2 = score2Innings
              ? `${score2Innings.runs}/${score2Innings.wickets} (${score2Innings.overs})`
              : '-';

            const result = match?.matchInfo?.status || 'Live';
            const battingTeam = match?.matchScore?.batTeam?.teamName;
            const bowlingTeam = match?.matchScore?.bowlTeam?.teamName;

            return {
              team1Name,
              team2Name,
              team1Abbr,
              team2Abbr,
              matchTitle,
              score1,
              score2,
              result,
              battingTeam,
              bowlingTeam
            };
          }) || []
        ) || [];

        setMatches(cards);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="live-score-wrapper">
      <h2>🏏 Live Cricket Scores</h2>
      <div className="match-grid">
        {matches.map((match, index) => (
          <div className="match-card" key={index}>
            <h3 className="match-title">
              {getFlagImage(match.team1Abbr)} {match.team1Abbr} vs {match.team2Abbr} {getFlagImage(match.team2Abbr)} - {match.matchTitle.split(' - ')[1]}
            </h3>
            <div className="match-status">{match.result}</div>
            <div className="team-row">
              <span className="team-name">{getFlagImage(match.team1Abbr)} {match.team1Name}</span>
              <span className="score">{match.score1}</span>
            </div>
            <div className="team-row">
              <span className="team-name">{getFlagImage(match.team2Abbr)} {match.team2Name}</span>
              <span className="score">{match.score2}</span>
            </div>
            <div className="additional-info">
              🏏 Batting: {match.battingTeam || '-'} | 
              <img src="/cricket-ball.png" alt="Ball" className="ball-icon" /> Bowling: {match.bowlingTeam || '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getFlagImage(abbreviation) {
  const flagMap = {
    IND: '/flags/india.png',
    AUS: '/flags/australia.png',
    ENG: '/flags/england.png',
    PAK: '/flags/pakistan.png',
    SL: '/flags/srilanka.png',
    SA: '/flags/southafrica.png',
    WI: '/flags/westindies.png',
    BAN: '/flags/bangladesh.png',
    NZ: '/flags/newzealand.png',
    AFG: '/flags/afghanistan.png',
    IRE: '/flags/ireland.png',
    ZIM: '/flags/zimbabwe.png',
    NAM: '/flags/namibia.png',
    NED: '/flags/netherlands.png',
    SCO: '/flags/scotland.png',
    UAE: '/flags/uae.png',
    USA: '/flags/usa.png',
    OMN: '/flags/oman.png',
    NEP: '/flags/nepal.png',
    CAN: '/flags/canada.png'
  };

  const flagSrc = flagMap[abbreviation];
  return flagSrc ? <img src={flagSrc} alt={abbreviation} className="flag-icon" /> : null;
}
