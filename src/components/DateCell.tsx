import React from "react";

interface DateCellProps {
  day: number;
  dayType: "previous" | "current" | "next";
  onClick: (day: number) => void;
  isToday: boolean;
  isEnteredDate: boolean;
}

const DateCell: React.FC<DateCellProps> = ({
  day,
  dayType,
  onClick,
  isToday,
  isEnteredDate,
}) => {
  const handleClick = () => {
    onClick(day);
  };

  const getCellClass = () => {
    let className = "";
    if (dayType === "previous") {
      className = "previous-month-day";
    } else if (dayType === "next") {
      className = "next-month-day";
    } else {
      className = "current-month-day";
    }

    if (isToday) {
      className += " today";
    }
    if (isEnteredDate) {
      className += " entered-date";
    }

    return className;
  };

  return (
    <td className={`day-cell ${getCellClass()}`} onClick={handleClick}>
      {day}
    </td>
  );
};

export default DateCell;
