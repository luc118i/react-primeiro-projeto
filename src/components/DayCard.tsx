import React from "react";

interface DayCardProps {
  day: Date;
}

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  const today = new Date();

  // Verifica se é o dia atual
  const isToday =
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear();

  // Verifica se é um dia passado ou futuro
  const isPast = day < today && !isToday;
  const isFuture = day > today;

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 rounded-lg shadow-md cursor-pointer transition transform
        ${isToday ? "bg-blue-500 text-white scale-110 font-bold" : ""} 
        ${isPast ? "bg-gray-200 text-gray-400 scale-90 opacity-70" : ""} 
        ${isFuture ? "bg-white text-gray-800 scale-100 hover:scale-105" : ""}
      `}
    >
      {/* Nome do dia */}
      <div
        className={`font-semibold text-xs ${
          isToday ? "text-blue-200" : isPast ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {day.toLocaleDateString("pt-BR", { weekday: "short" })}
      </div>
      {/* Número do dia */}
      <div className="text-sm font-bold">{day.getDate()}</div>
    </div>
  );
};

export default DayCard;
