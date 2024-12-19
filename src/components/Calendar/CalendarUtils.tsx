export const getWeekDates = (weekOffset: number): Date[] => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i + weekOffset * 7);
    return date;
  });
};

export const getWeekTitle = (weekOffset: number): string => {
  if (weekOffset === 0) return "Semana Atual";
  if (weekOffset === -1) return "Semana Passada";
  if (weekOffset === 1) return "Próxima Semana";
  return weekOffset < 0
    ? `${Math.abs(weekOffset)} Semanas Atrás`
    : `Daqui a ${weekOffset} Semanas`;
};

// components/Calendar/CalendarUtils.ts
export const calculateWeekDates = (offset: number): Date[] => {
  const today = new Date();
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + offset * 7)
  );
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};
