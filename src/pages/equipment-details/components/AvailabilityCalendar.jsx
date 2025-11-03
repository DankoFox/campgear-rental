import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const AvailabilityCalendar = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;

    const isPast = date < new Date().setHours(0, 0, 0, 0);
    if (isPast) return;

    if (!selectedDates?.start || (selectedDates?.start && selectedDates?.end)) {
      setSelectedDates({ start: date, end: null });
    } else if (selectedDates?.start && !selectedDates?.end) {
      if (date < selectedDates?.start) {
        setSelectedDates({ start: date, end: selectedDates?.start });
      } else {
        setSelectedDates({ start: selectedDates?.start, end: date });
      }
    }
  };

  const isDateInRange = (date) => {
    if (!date || !selectedDates?.start) return false;
    if (!selectedDates?.end)
      return date?.getTime() === selectedDates?.start?.getTime();

    return date >= selectedDates?.start && date <= selectedDates?.end;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = getDaysInMonth(currentMonth);

  useEffect(() => {
    if (selectedDates?.start && selectedDates?.end) {
      onDateSelect(selectedDates);
    }
  }, [selectedDates, onDateSelect]);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold">Available at</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-muted rounded-md transition-micro"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="font-medium min-w-[120px] text-center">
            {currentMonth?.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-muted rounded-md transition-micro"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {/* Weekday headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground p-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2" />;
          }

          const isSelected = isDateInRange(date);
          const isToday = date?.toDateString() === new Date()?.toDateString();
          const isPast = date < new Date().setHours(0, 0, 0, 0);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isPast}
              className={`relative p-2 text-sm rounded-md transition-micro ${
                isPast
                  ? "text-muted cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <div className="text-center">{date?.getDate()}</div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary rounded" />
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-warning/20 rounded" />
          <span>High season</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-muted rounded" />
          <span>Not available</span>
        </div>
      </div>

      {/* Selected Date Range Display */}
      {selectedDates?.start && (
        <div
          className={`mt-4 p-3 rounded-md border ${
            selectedDates.end
              ? "bg-primary/10 border-primary/20"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <p className="text-sm font-medium">
            Selected date: {selectedDates?.start?.toLocaleDateString("vi-VN")}
            {selectedDates?.end &&
              ` - ${selectedDates?.end?.toLocaleDateString("vi-VN")}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
