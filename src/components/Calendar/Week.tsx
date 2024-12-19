import React, { useState } from "react";
import DayCard from "./DayCard";

// Função para calcular o início da semana
const startOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajusta para segunda-feira
  return new Date(date.setDate(diff));
};

const WeekView: React.FC = () => {
  const [date, setDate] = useState(startOfWeek(new Date())); // Sempre inicia na segunda

  // Lógica para mudar de semana
  const handleChangeWeek = (direction: "prev" | "next") => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + (direction === "prev" ? -7 : 7));
    setDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Navegação de semanas */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleChangeWeek("prev")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          &larr; Semana Anterior
        </button>
        <h2 className="text-xl font-bold">
          Semana de{" "}
          {date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
        </h2>
        <button
          onClick={() => handleChangeWeek("next")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Próxima Semana &rarr;
        </button>
      </div>

      {/* Calendário semanal */}
      <div className="flex justify-between p-4 space-x-2 bg-gray-800 rounded-lg shadow-lg">
        {Array.from({ length: 7 }, (_, i) => {
          const day = new Date(date);
          day.setDate(day.getDate() + i);

          return <DayCard key={i} day={day} />;
        })}
      </div>
    </div>
  );
};

export default WeekView;
