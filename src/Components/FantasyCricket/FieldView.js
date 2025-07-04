import React from 'react';

const roleMap = {
  WK: "Wicket Keeper",
  BAT: "Batter",
  AR: "All-Rounder",
  BOWL: "Bowler"
};

const FieldView = ({ selectedPlayers, captainId, viceCaptainId }) => {
  const groupByRole = (role) =>
    selectedPlayers.filter((p) => p.role === role);

  return (
    <div className="bg-[#0c162d] text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Team on Field</h2>
      {Object.keys(roleMap).map((role) => (
        <div key={role} className="mb-3">
          <h3 className="text-blue-400 text-lg">{roleMap[role]}</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {groupByRole(role).map((player) => (
              <div
                key={player.id}
                className="bg-[#1e293b] p-2 px-4 rounded-xl border border-blue-600 shadow-md text-center"
              >
                <p className="font-semibold text-white">{player.name}</p>
                <p className="text-xs text-gray-400">{player.team}</p>
                <p className="text-sm text-yellow-400">
                  {captainId === player.id ? "Captain" : viceCaptainId === player.id ? "Vice-Captain" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FieldView;
