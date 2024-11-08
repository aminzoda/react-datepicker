import React from "react";

const WeekdaysHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <th key={day}>{day}</th>
        ))}
      </tr>
    </thead>
  );
};

export default WeekdaysHeader;
