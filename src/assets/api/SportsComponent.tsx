import React, { useState, useEffect } from "react";

// Definição da interface fora do componente
interface Team {
  idTeam: string;
  strTeam: string;
  // Adicione outras propriedades relevantes conforme necessário
}

const SportsComponent: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [league, setLeague] = useState<string>("English Premier League"); // Liga padrão

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const leagueParam = encodeURIComponent(league); // Codifica a liga para uso seguro na URL
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueParam}`
        );
        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data.teams as Team[]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchTeams();
  }, [league]); // Reexecuta a requisição sempre que a liga mudar

  return (
    <div>
      <h1>Times da {league}</h1>
      <select value={league} onChange={(e) => setLeague(e.target.value)}>
        <option value="English Premier League">Premier League Inglesa</option>
        <option value="La Liga">La Liga</option>
        <option value="Serie A">Serie A</option>
        <option value="Bundesliga">Bundesliga</option>
        <option value="Ligue 1">Ligue 1</option>
        <option value="Brasileirão Série A">Brasileirão Série A</option>
        <option value="Jupiler Pro League">Jupiler Pro League</option>
        <option value="Major League Soccer">Major League Soccer</option>
        <option value="Primeira Liga">Primeira Liga</option>
        <option value="Argentine Primera División">
          Argentine Primera División
        </option>
      </select>
      <ul>
        {teams.map((team) => (
          <li key={team.idTeam}>{team.strTeam}</li>
        ))}
      </ul>
    </div>
  );
};

export default SportsComponent;
