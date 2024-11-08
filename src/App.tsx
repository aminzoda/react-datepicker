import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "./components/Calendar";
import "./App.css";

const App: React.FC = () => {
  const [dateInput, setDateInput] = useState("");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [enteredDate, setEnteredDate] = useState<Date | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  // Handle "Enter" key press to trigger the calendar update
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const [day, month, year] = dateInput
        .split("/")
        .map((item) => parseInt(item, 10));

      if (day && month && year) {
        const parsedDate = new Date(year, month - 1, day);

        if (!isNaN(parsedDate.getTime())) {
          setEnteredDate(parsedDate); // Set the entered date
          setCurrentDate(parsedDate); // Update the current date to the entered date
          setShowCalendar(true); // Show the calendar
          setDateInput(""); // Clear the input field after updating the calendar
        } else {
          alert("Invalid date. Please use the format DD/MM/YYYY.");
        }
      } else {
        alert("Invalid date. Please use the format DD/MM/YYYY.");
      }
    }
  };

  // Toggle calendar visibility when icon is clicked
  const handleCalendarClick = () => {
    setShowCalendar((prev) => !prev);
    setDateInput("");
  };

  return (
    <div className="app">
      <div className="content">
        <div className="date-input">
          <input
            type="text"
            value={dateInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="DD/MM/YYYY"
            className="input-date"
          />
          <FaCalendarAlt
            className="calendar-icon"
            onClick={handleCalendarClick}
          />
        </div>

        {showCalendar && (
          <Calendar initialDate={currentDate} enteredDate={enteredDate} />
        )}
      </div>
    </div>
  );
};

export default App;
