import React from "react";

interface Game {
  id: number;
  teams: string;
  time: string;
}

interface GamesListProps {
  games: Game[];
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">Jogos de Hoje</h3>
      <div className="flex flex-wrap gap-2 bg-gray-700 p-3 rounded-md">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center bg-gray-600 text-white rounded-lg p-2 w-40 shadow-md"
            >
              <p className="font-bold">{game.teams}</p>
              <span className="text-sm text-gray-300">{game.time}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">
            Nenhum jogo programado para hoje.
          </p>
        )}
      </div>
    </div>
  );
};

export default GamesList;
