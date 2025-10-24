import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const AvailabilityCalendar = ({ availabilityData, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN")?.format(price) + "₫";
  };

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
      days?.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const getDateAvailability = (date) => {
    if (!date) return null;

    const dateStr = date?.toISOString()?.split("T")?.[0];
    return availabilityData?.find((item) => item?.date === dateStr);
  };

  const handleDateClick = (date) => {
    if (!date) return;

    const availability = getDateAvailability(date);
    if (!availability || !availability?.available) return;

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

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const days = getDaysInMonth(currentMonth);

  React.useEffect(() => {
    if (selectedDates?.start && selectedDates?.end) {
      onDateSelect(selectedDates);
    }
  }, [selectedDates, onDateSelect]);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold">Lịch trống</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-muted rounded-md transition-micro"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="font-medium min-w-[120px] text-center">
            {currentMonth?.toLocaleDateString("vi-VN", {
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
        {/* Week day headers */}
        {weekDays?.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground p-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days?.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2" />;
          }

          const availability = getDateAvailability(date);
          const isSelected = isDateInRange(date);
          const isToday = date?.toDateString() === new Date()?.toDateString();
          const isPast = date < new Date()?.setHours(0, 0, 0, 0);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isPast || !availability?.available}
              className={`relative p-2 text-sm rounded-md transition-micro ${
                isPast || !availability?.available
                  ? "text-muted cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                  ? "bg-accent text-accent-foreground"
                  : availability?.isPeak
                  ? "bg-warning/20 text-warning-foreground hover:bg-warning/30"
                  : "hover:bg-muted"
              }`}
            >
              <div className="text-center">
                <div>{date?.getDate()}</div>
                {availability?.available && availability?.price && (
                  <div className="text-xs opacity-75">
                    {formatPrice(availability?.price)}
                  </div>
                )}
              </div>
              {availability?.isPeak && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-warning rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary rounded" />
          <span>Đã chọn</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-warning/20 rounded" />
          <span>Cao điểm</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-muted rounded" />
          <span>Không có sẵn</span>
        </div>
      </div>
      {/* Selected Date Range Display */}
      {selectedDates?.start && (
        <div className="mt-4 p-3 bg-primary/10 rounded-md">
          <p className="text-sm font-medium">
            Ngày đã chọn: {selectedDates?.start?.toLocaleDateString("vi-VN")}
            {selectedDates?.end &&
              ` - ${selectedDates?.end?.toLocaleDateString("vi-VN")}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;
