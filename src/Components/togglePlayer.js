 
 
 const togglePlayer = (player) => {
    const exists = selectedPlayers.some(p => p.id === player.id);
    if (exists) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setCreditsLeft(creditsLeft + player.credit);
    } else if (selectedPlayers.length < 11 && creditsLeft >= player.credit) {
      setSelectedPlayers([...selectedPlayers, player]);
      setCreditsLeft(creditsLeft - player.credit);
    }
  };

  const renderByRole = (role) => (
    <div className="category-section">
      <h5>{role}</h5>
      <div className="player-grid">
        {players
          .filter(p => p.role?.toLowerCase() === role.toLowerCase())
          .map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              selected={selectedPlayers.some(p => p.id === player.id)}
              onToggle={() => togglePlayer(player)}
            />
        ))}
      </div>
    </div>
  );

  return (
    <div className="fantasy-builder">
      <div className="team-summary">
        <span><strong>Selected:</strong> {selectedPlayers.length}/11</span>
        <span><strong>Credits:</strong> {creditsLeft}</span>
      </div>

      {renderByRole("wicketkeeper")}
      {renderByRole("batsman")}
      {renderByRole("allrounder")}
      {renderByRole("bowler")}

      <button className="submit-team-btn">View My Team</button>
    </div>
  );
}
