import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface CalendarButtonProps {
  toggleCalendarView: () => void;
  showFullCalendar: boolean;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({
  toggleCalendarView,
  showFullCalendar,
}) => (
  <button
    onClick={toggleCalendarView}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center w-10 h-10 font-medium shadow-md transition-colors"
  >
    {showFullCalendar ? <FaMinus size={14} /> : <FaPlus size={14} />}
  </button>
);

export default CalendarButton;
