interface Game {
  teamA: string;
  teamB: string;
  date: string;
  time: string;
}

interface GamesTableProps {
  games: Game[];
}

export default function GamesTable({ games }: GamesTableProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">Jogos do Dia</h2>
      <div className="grid grid-cols-1 gap-2">
        {games.map((game, index) => (
          <div key={index} className="bg-gray-600 p-4 rounded-md shadow">
            <p className="text-white text-sm">
              {game.teamA} vs {game.teamB}
            </p>
            <p className="text-gray-300 text-xs">
              {game.date} - {game.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
