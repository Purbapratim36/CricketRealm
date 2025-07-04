import React from 'react';

const PlayerSelection = ({
  players,
  selectedPlayers,
  onSelect,
  onRemove,
  captainId,
  viceCaptainId,
  setCaptain,
  setViceCaptain,
  roleFilter,
  setRoleFilter,
  searchTerm,
  setSearchTerm,
}) => {
  const isSelected = (id) => selectedPlayers.some((p) => p.id === id);

  const filtered = players
    .filter((p) =>
      roleFilter === 'ALL' ? true : p.role === roleFilter
    )
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-[#0c162d] p-4 text-white rounded-lg shadow-lg">
      <div className="flex gap-2 mb-4 flex-wrap">
        {['ALL', 'WK', 'BAT', 'AR', 'BOWL'].map((r) => (
          <button
            key={r}
            className={`px-3 py-1 rounded-full border ${
              roleFilter === r ? 'bg-blue-600 text-white' : 'border-gray-600'
            }`}
            onClick={() => setRoleFilter(r)}
          >
            {r}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-auto px-3 py-1 rounded bg-[#1e293b] text-white border border-gray-700"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((player) => (
          <div
            key={player.id}
            className="bg-[#1e293b] p-3 rounded-lg flex justify-between items-center border border-blue-700"
          >
            <div>
              <p className="font-semibold text-white">{player.name}</p>
              <p className="text-xs text-gray-400">{player.role} • {player.team}</p>
              <p className="text-sm text-green-400">Credits: {player.credits}</p>
              <p className="text-sm text-yellow-400">Selected by: {player.selectionPercent || '45%'}</p>
            </div>
            <div className="flex flex-col gap-1">
              {isSelected(player.id) ? (
                <>
                  <button
                    onClick={() => onRemove(player.id)}
                    className="text-red-400 text-xs underline"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setCaptain(player.id)}
                    className={`text-blue-400 text-xs underline ${captainId === player.id && 'font-bold'}`}
                  >
                    {captainId === player.id ? 'Captain ✓' : 'Make C'}
                  </button>
                  <button
                    onClick={() => setViceCaptain(player.id)}
                    className={`text-yellow-400 text-xs underline ${viceCaptainId === player.id && 'font-bold'}`}
                  >
                    {viceCaptainId === player.id ? 'Vice-Captain ✓' : 'Make VC'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onSelect(player)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSelection;
