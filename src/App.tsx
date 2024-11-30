import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month < 10 ? "0" + month : month}/${
    day < 10 ? "0" + day : day
  }/${year}`;
};

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return formatDate(today);
  });
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [viewMode, setViewMode] = useState<"calendar" | "month" | "year">(
    "calendar"
  );
  const [yearRange, setYearRange] = useState<number[]>([]);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYearRange(Array.from({ length: 12 }, (_, i) => currentYear - 6 + i));
  }, []);

  const generateDays = (year: number, month: number): string[] => {
    const days: string[] = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      days.push(formatDate(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setViewMode("year");
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setViewMode("calendar");
  };

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
    setViewMode("calendar");
  };

  const navigateYearRange = (direction: "prev" | "next") => {
    setYearRange((prevRange) => {
      const offset = 12;
      const newStart =
        direction === "prev" ? prevRange[0] - offset : prevRange[0] + offset;
      return Array.from({ length: 12 }, (_, i) => newStart + i);
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedMonth(
      (prev) => (direction === "prev" ? prev - 1 : prev + 1) % 12
    );
  };

  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = generateDays(selectedYear, selectedMonth);

  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];

  return (
    <div className="date-picker-container" tabIndex={0}>
      <div className="date-picker-input-wrapper">
        <input
          className="date-picker-input"
          type="text"
          value={selectedDate}
          onClick={toggleCalendar}
          readOnly
        />
        {/* Calendar Icon inside the input wrapper */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#5f6368"
          height="24px"
          width="24px"
          stroke="currentColor"
          viewBox="0 -960 960 960"
          className="calendar-icon"
          onClick={toggleCalendar}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
          />
        </svg>
      </div>

      {isCalendarVisible && (
        <div className="date-picker-calendar" ref={calendarRef}>
          {viewMode === "calendar" && (
            <>
              <div className="date-picker-header">
                <button onClick={() => setViewMode("month")}>
                  {months[selectedMonth]} {selectedYear}
                </button>
                <div>
                  <button onClick={() => navigateMonth("prev")}>&lt;</button>
                  <button onClick={() => navigateMonth("next")}>&gt;</button>
                </div>
              </div>
              <hr />
              <div className="date-picker-weekdays">
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                  <div key={day} className="date-picker-weekday">
                    {day}
                  </div>
                ))}
              </div>
              <div className="date-picker-days">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="date-picker-day empty"
                  ></div>
                ))}
                {daysInMonth.map((date) => (
                  <div
                    key={date}
                    className={`date-picker-day ${
                      date === selectedDate ? "selected" : ""
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {new Date(date).getDate()}
                  </div>
                ))}
              </div>
            </>
          )}

          {viewMode === "month" && (
            <>
              <div className="date-picker-header">
                <div>
                  <button onClick={() => setViewMode("year")}>
                    {months[selectedMonth]}
                  </button>
                  <button onClick={() => setViewMode("calendar")}>
                    {selectedYear}
                  </button>
                </div>
                <div>
                  <button onClick={() => navigateYearRange("prev")}>
                    &lt;
                  </button>
                  <button onClick={() => navigateYearRange("next")}>
                    &gt;
                  </button>
                </div>
              </div>
              <hr />
              <div className="date-picker-grid">
                {months.map((month, index) => (
                  <div
                    key={month}
                    className={`date-picker-month ${
                      index === selectedMonth ? "selected" : ""
                    }`}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </>
          )}

          {viewMode === "year" && (
            <>
              <div className="date-picker-header">
                <div>
                  <button onClick={() => setViewMode("month")}>
                    {months[selectedMonth]}
                  </button>
                  <button onClick={() => setViewMode("calendar")}>
                    {selectedYear}
                  </button>
                </div>
                <div>
                  <button onClick={() => navigateYearRange("prev")}>
                    &lt;
                  </button>
                  <button onClick={() => navigateYearRange("next")}>
                    &gt;
                  </button>
                </div>
              </div>
              <hr />
              <div className="date-picker-grid">
                {yearRange.map((year) => (
                  <div
                    key={year}
                    className={`date-picker-year ${
                      year === selectedYear ? "selected" : ""
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
