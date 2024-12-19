import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface WeekNavigationProps {
  onWeekNavigation: (direction: "prev" | "next") => void;
  getWeekTitle: () => string;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  onWeekNavigation,
  getWeekTitle,
}) => (
  <div className="flex justify-between w-full items-center mb-2">
    <button
      onClick={() => onWeekNavigation("prev")}
      className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
    >
      <FaChevronLeft size={12} />
    </button>
    <h3 className="text-sm text-gray-300 font-medium">{getWeekTitle()}</h3>
    <button
      onClick={() => onWeekNavigation("next")}
      className="text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-full"
    >
      <FaChevronRight size={12} />
    </button>
  </div>
);

export default WeekNavigation;
