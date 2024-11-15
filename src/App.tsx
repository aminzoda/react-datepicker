import React, { useState } from "react";
import "./App.css";

export default function ResponsiveDatePickers() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleClick = () => {
    console.log("Date picker clicked!");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontWeight: "bold", alignItems: "center" }}>
          Date Picker
        </label>
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        onClick={handleClick}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          maxWidth: "200px",
        }}
      />
    </div>
  );
}
