import React from "react";

interface MonthNavigationProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });

  return (
    <div className="month">
      <button onClick={goToPreviousMonth}>{"<"}</button>
      <span>
        {monthName} {year}
      </span>
      <button onClick={goToNextMonth}>{">"}</button>
    </div>
  );
};

export default MonthNavigation;
