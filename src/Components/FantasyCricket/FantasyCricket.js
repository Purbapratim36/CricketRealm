import React, { useEffect, useState } from 'react';
import PlayerSelection from './PlayerSelection';
import FieldView from './FieldView';
import { loadAllPlayers } from '../players/playerService';
import { saveTeamToFirestore } from '../firebaseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FantasyCricket = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [captainId, setCaptainId] = useState(null);
  const [viceCaptainId, setViceCaptainId] = useState(null);
  const [creditsLeft, setCreditsLeft] = useState(100);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const allPlayers = await loadAllPlayers();
      setPlayers(allPlayers);
    };
    fetchPlayers();
  }, []);

  const handleSelectPlayer = (player) => {
    if (selectedPlayers.length >= 11) return toast.error('You can only select 11 players');
    if (selectedPlayers.some(p => p.id === player.id)) return;
    if (creditsLeft < player.credits) return toast.error('Not enough credits');

    setSelectedPlayers([...selectedPlayers, player]);
    setCreditsLeft(creditsLeft - player.credits);
  };

  const handleRemovePlayer = (id) => {
    const updated = selectedPlayers.filter(p => p.id !== id);
    const removedPlayer = selectedPlayers.find(p => p.id === id);
    setSelectedPlayers(updated);
    setCreditsLeft(creditsLeft + (removedPlayer?.credits || 0));
    if (captainId === id) setCaptainId(null);
    if (viceCaptainId === id) setViceCaptainId(null);
  };

  const handleSaveTeam = async () => {
    if (selectedPlayers.length !== 11) return toast.error('Select 11 players');
    if (!captainId || !viceCaptainId) return toast.error('Assign both Captain and Vice-Captain');
    const success = await saveTeamToFirestore('demoUser', 'demoMatch', {
      players: selectedPlayers,
      captainId,
      viceCaptainId
    });
    success ? toast.success('Team saved!') : toast.error('Failed to save');
  };

  const simulateMatch = () => {
    if (selectedPlayers.length !== 11 || !captainId || !viceCaptainId) {
      toast.error('Complete your team before simulating');
      return;
    }
    const total = selectedPlayers.reduce((sum, p) => {
      let multiplier = 1;
      if (p.id === captainId) multiplier = 2;
      else if (p.id === viceCaptainId) multiplier = 1.5;
      return sum + p.credits * multiplier;
    }, 0);
    const result = Math.round(total + Math.random() * 50);
    setSimulationResult(result);
    toast.info(`Your simulated score is ${result}`);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Fantasy Cricket Team Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlayerSelection
          players={players}
          selectedPlayers={selectedPlayers}
          onSelect={handleSelectPlayer}
          onRemove={handleRemovePlayer}
          captainId={captainId}
          viceCaptainId={viceCaptainId}
          setCaptain={setCaptainId}
          setViceCaptain={setViceCaptainId}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FieldView
          selectedPlayers={selectedPlayers}
          captainId={captainId}
          viceCaptainId={viceCaptainId}
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p>Selected Players: {selectedPlayers.length}/11</p>
          <p>Credits Left: {creditsLeft}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveTeam}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Team
          </button>
          <button
            onClick={simulateMatch}
            className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            Simulate Match
          </button>
        </div>
      </div>

      {simulationResult && (
        <div className="mt-4 text-green-400 text-lg">
          Simulated Score: <span className="font-bold">{simulationResult}</span>
        </div>
      )}
    </div>
  );
};

export default FantasyCricket;
