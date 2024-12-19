import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getWeekDates, getWeekTitle } from "./CalendarUtils";
import DayCard from "./DayCard";
import WeekNavigation from "./WeekNavigation";
import CalendarButton from "./CalendarButton";

interface CalendarWrapperProps {
  weekOffset: number;
  onWeekNavigation: (direction: "prev" | "next") => void;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  weekOffset,
  onWeekNavigation,
}) => {
  const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  useEffect(() => {
    const dates = getWeekDates(weekOffset);
    setCurrentWeekDates(dates);
  }, [weekOffset]);

  const toggleCalendarView = () => {
    setShowFullCalendar((prev) => !prev);
  };

  const renderWeekView = () => (
    <div className="flex flex-col items-center">
      <WeekNavigation
        onWeekNavigation={onWeekNavigation}
        getWeekTitle={() => getWeekTitle(weekOffset)}
      />
      <div className="grid grid-cols-7 gap-1">
        {currentWeekDates.map((date, index) => (
          <DayCard key={index} day={date} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="absolute top-20 left-10 w-72 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Eventos</h2>
      <div className="flex flex-col items-start space-y-4 justify-center">
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
        <CalendarButton
          toggleCalendarView={toggleCalendarView}
          showFullCalendar={showFullCalendar}
        />
      </div>
    </div>
  );
};

export default CalendarWrapper;
