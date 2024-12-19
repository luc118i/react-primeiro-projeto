import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayCard from "./components/Calendar/DayCard";
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import {
  calculateWeekDates,
  getWeekTitle,
} from "./components/Calendar/CalendarUtils";
import GamesTable from "./components/GamesTable";

const App: React.FC = () => {
  const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [games, setGames] = useState([
    { teamA: "Time A", teamB: "Time B", date: "20/12/2024", time: "15:30" },
    { teamA: "Time C", teamB: "Time D", date: "20/12/2024", time: "18:00" },
  ]);

  useEffect(() => {
    setCurrentWeekDates(calculateWeekDates(0));
  }, []);

  const toggleCalendarView = () => {
    setShowFullCalendar((prev) => !prev);
  };

  const handleWeekNavigation = (direction: "prev" | "next") => {
    const newOffset = direction === "prev" ? weekOffset - 1 : weekOffset + 1;
    setWeekOffset(newOffset);
    setCurrentWeekDates(calculateWeekDates(newOffset));
  };

  const renderWeekView = () => (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-2">
        <button
          onClick={() => handleWeekNavigation("prev")}
          className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
        >
          <FaChevronLeft size={12} />
        </button>
        <h3 className="text-sm text-gray-300 font-medium">
          {getWeekTitle(weekOffset)}
        </h3>
        <button
          onClick={() => handleWeekNavigation("next")}
          className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {currentWeekDates.map((date, index) => (
          <DayCard key={index} day={date} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr]">
      {/* Navbar */}
      <div className="bg-gray-800">
        <Navbar />
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-12 gap-4 p-4 mt-11">
        {" "}
        {/* Adicionado mt-4 */}
        {/* Coluna Esquerda */}
        <div className="col-span-4 bg-gray-800 p-4 shadow-lg space-y-6">
          {/* Calendário */}
          <div className="bg-gray-700 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">Eventos</h2>
            {showFullCalendar ? (
              <Calendar
                className="bg-white rounded-lg shadow-md w-full text-xs"
                tileClassName="p-1 text-xs"
                view="month"
                locale="pt-BR"
                onChange={() => {}}
              />
            ) : (
              renderWeekView()
            )}
            <button
              onClick={toggleCalendarView}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center font-medium shadow-md transition-colors"
            >
              {showFullCalendar ? <FaMinus size={14} /> : <FaPlus size={14} />}
            </button>
          </div>

          {/* Tabela de Jogos */}
          <div>
            <GamesTable games={games} />
          </div>
        </div>
        {/* Coluna Central */}
        <div className="col-span-6 bg-gray-800 p-4 shadow-lg">
          <div className="h-full bg-gray-700 p-4 rounded-lg">
            <p className="text-white">
              Informações principais ou eventos aqui.
            </p>
          </div>
        </div>
        {/* Coluna Direita */}
        <div className="col-span-2 bg-gray-800 p-4 shadow-lg">
          <div className="h-full bg-gray-700 p-4 rounded-lg">
            <p className="text-white">Widgets ou informações adicionais</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
