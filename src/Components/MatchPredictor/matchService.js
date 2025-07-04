// src/Components/MatchPredictor/matchService.js
import axios from 'axios';

const API_KEY = 'aa59d4bc-a127-4a47-8076-733e646fd149';
const BASE_URL = 'https://api.cricapi.com/v1';

// ✅ Get list of current matches
export async function fetchLiveMatches() {
  const res = await axios.get(`${BASE_URL}/currentMatches`, {
    params: {
      apikey: API_KEY
    }
  });

  return res.data.data || []; // ensure fallback
}

// ✅ Get detailed score for one match
export async function fetchMatchDetails(matchId) {
  const res = await axios.get(`${BASE_URL}/match_scorecard`, {
    params: {
      apikey: API_KEY,
      id: matchId
    }
  });

  return res.data.data;
}
