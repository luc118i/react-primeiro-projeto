import React, { useState, useEffect } from "react";
import TransparentBox from "./components/TransparentBox";
import Greeting from "./components/Greeting";
import Button from "./components/Button";
import Navbar from "./components/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayCard from "./components/DayCard"; // Importando o componente DayCard
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [moveToTop, setMoveToTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [animationPhase, setAnimationPhase] = useState("typing");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
  const [weekOffset, setWeekOffset] = useState(0); // Definindo o estado para o deslocamento das semanas

  const fullText = "Bem-vindo ao MetricLab";
  const finalText = "MetricLab";

  useEffect(() => {
    if (showWelcome) {
      let index = 0;
      const typeText = () => {
        if (index < fullText.length) {
          setTypingText(fullText.slice(0, index + 1));
          index++;
        } else {
          setAnimationPhase("waiting");
          setTimeout(() => setAnimationPhase("moving"), 1000);
        }
      };

      if (animationPhase === "typing") {
        const typingInterval = setInterval(typeText, 100);
        return () => clearInterval(typingInterval);
      }
    }
  }, [showWelcome, animationPhase]);

  useEffect(() => {
    if (animationPhase === "moving") {
      setMoveToTop(true);
      setTimeout(() => setAnimationPhase("backspace"), 500);
    }
  }, [animationPhase]);

  useEffect(() => {
    if (animationPhase === "backspace") {
      let index = 0;
      const deleteText = () => {
        if (index < fullText.length - finalText.length) {
          setTypingText(fullText.slice(index + 1));
          index++;
        } else {
          setTypingText(finalText);
          setAnimationPhase("done");
          setTimeout(() => setShowCalendar(true), 1000);
        }
      };

      const backspaceInterval = setInterval(deleteText, 100);
      return () => clearInterval(backspaceInterval);
    }
  }, [animationPhase]);

  useEffect(() => {
    // Calcula as datas da semana atual
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
    setCurrentWeekDates(dates);
  }, []);

  const handleButtonClick = () => {
    setHasEntered(true);
    setShowWelcome(true);

    setTimeout(() => {
      setShowNavbar(true);
    }, 4300);
  };

  const toggleCalendarView = () => {
    setShowFullCalendar((prev) => !prev);
  };

  const handleWeekNavigation = (direction: "prev" | "next") => {
    setWeekOffset((prevOffset) =>
      direction === "prev" ? prevOffset - 1 : prevOffset + 1
    ); // Atualiza o deslocamento das semanas

    setCurrentWeekDates((prevDates) => {
      return prevDates.map((date) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + (direction === "prev" ? -7 : 7)); // Muda a semana
        return newDate;
      });
    });
  };

  const getWeekTitle = () => {
    if (weekOffset === 0) return "Semana Atual";
    if (weekOffset === -1) return "Semana Passada";
    if (weekOffset === 1) return "Próxima Semana";
    return weekOffset < 0
      ? `${Math.abs(weekOffset)} Semanas Atrás`
      : `Daqui a ${weekOffset} Semanas`;
  };

  const renderWeekView = () => {
    return (
      <div className="flex flex-col items-center">
        {/* Botões de Navegação */}
        <div className="flex justify-between w-full items-center mb-2">
          <button
            onClick={() => handleWeekNavigation("prev")}
            className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
          >
            <FaChevronLeft size={12} /> {/* Ícone menor */}
          </button>

          <h3 className="text-sm text-gray-300 font-medium">
            {getWeekTitle()} {/* Texto Dinâmico */}
          </h3>

          <button
            onClick={() => handleWeekNavigation("next")}
            className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
          >
            <FaChevronRight size={12} /> {/* Ícone menor */}
          </button>
        </div>

        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-1">
          {currentWeekDates.map((date, index) => (
            <DayCard key={index} day={date} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Navbar */}
      <div
        className={`${
          showNavbar
            ? "opacity-100 transition-opacity duration-1000 ease-in"
            : "opacity-0 transition-opacity duration-1000 ease-out"
        }`}
      >
        <Navbar />
      </div>

      {/* Saudação + botão */}
      {!hasEntered ? (
        <div className="flex justify-center items-center min-h-screen">
          <TransparentBox>
            <Greeting />
            <Button onClick={handleButtonClick} label="Vamos lá" />
          </TransparentBox>
        </div>
      ) : (
        // Mensagem animada
        <div
          className={`${
            showWelcome
              ? moveToTop
                ? "absolute top-10 left-1/2 transform -translate-x-1/2 translate-y-0 opacity-100 transition-all duration-1000 ease-in-out z-10"
                : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all duration-1000 ease-in-out z-10"
              : "hidden"
          } text-white text-3xl font-bold`}
        >
          <h1>{typingText}</h1>
        </div>
      )}

      {/* Calendário exibido após a animação */}
      {showCalendar && (
        <div className="absolute top-20 left-10 w-72 p-4 bg-gray-800 rounded-lg shadow-lg items-center justify-center">
          <h2 className="text-xl font-semibold text-white mb-4">Eventos</h2>
          <div className="flex flex-col items-start space-y-4 justify-center">
            {/* Renderização condicional do calendário */}
            {showFullCalendar ? (
              <Calendar
                className="bg-white rounded-lg shadow-md w-full text-xs" // Reduz o tamanho da fonte para os dias
                tileClassName="p-1 text-xs" // Reduz o padding e o texto
                view="month"
                locale="pt-BR"
                onChange={() => {}}
              />
            ) : (
              renderWeekView() // Exibe a semana usando DayCard
            )}

            {/* Botão para alternar visão usando ícones */}
            <button
              onClick={toggleCalendarView}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center w-10 h-10 font-medium shadow-md transition-colors"
            >
              {showFullCalendar ? (
                <FaMinus size={14} /> // Ícone de minus para esconder o calendário completo
              ) : (
                <FaPlus size={14} /> // Ícone de plus para mostrar o calendário completo
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
