import React, { useState, useMemo } from "react";
import DateCell from "./DateCell";
import WeekdaysHeader from "./WeekdaysHeader";
import MonthNavigation from "./MonthNavigation";

interface CalendarProps {
  initialDate: Date;
  enteredDate: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate, enteredDate }) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [enteredDateState, setEnteredDate] = useState<Date | null>(enteredDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const getDaysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const previousMonthDays = getDaysInMonth(year, month - 1);

  const weeks = useMemo(() => {
    const weeks: { day: number; type: "previous" | "current" | "next" }[][] =
      [];
    let dayCounter = 1 - firstDayOfMonth;
    let nextMonthCounter = 1;

    while (dayCounter <= daysInMonth) {
      const week: { day: number; type: "previous" | "current" | "next" }[] = [];

      for (let i = 0; i < 7; i++) {
        if (dayCounter <= 0) {
          week.push({ day: previousMonthDays + dayCounter, type: "previous" });
        } else if (dayCounter > daysInMonth) {
          week.push({ day: nextMonthCounter++, type: "next" });
        } else {
          week.push({ day: dayCounter, type: "current" });
        }
        dayCounter++;
      }

      weeks.push(week);
    }

    return weeks;
  }, [firstDayOfMonth, daysInMonth, previousMonthDays]);

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const isEnteredDate = (day: number): boolean => {
    return enteredDateState?.getDate() === day || false;
  };

  const handleEnteredDate = (day: number) => {
    const entered = new Date(currentDate);
    entered.setDate(day);
    setEnteredDate(entered);
    setEnteredDate(entered);
    setCurrentDate(entered);
  };

  return (
    <div className="calendar-container">
      <MonthNavigation
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <table>
        <WeekdaysHeader />
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex} className="week">
              {week.map((dayObj, dayIndex) => (
                <DateCell
                  key={dayIndex}
                  day={dayObj.day}
                  dayType={dayObj.type}
                  onClick={handleEnteredDate}
                  isToday={isToday(dayObj.day)}
                  isEnteredDate={isEnteredDate(dayObj.day)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
