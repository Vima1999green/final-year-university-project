import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentYear = dayjs().year();
      setCurrentYear(currentYear);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const minDate = new Date(`${currentYear}-01-01`);
  const maxDate = new Date(`${currentYear}-12-31`);

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        min={minDate}
        max={maxDate}
       
      ></BigCalendar>
    </div>
  );
};

export default Calendar;
