import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "./Calendar.css";

const Calendar = ({ bookings, universityEvents }) => {
  const bookingEvents = bookings.map((booking) => ({
    title: booking.description,
    start: new Date(booking.bookingDate[0]),
    end: new Date(booking.bookingDate[booking.bookingDate.length - 1]),
    status: booking.status,
  }));

  const universityEvent = universityEvents.map((event) => ({
    title: event.eventName,
    start: new Date(event.eventDates[0]),
    end: new Date(event.eventDates[event.eventDates.length - 1]),
    status: event.eventStatus,
  }));

  const events = [...bookingEvents, ...universityEvent];
  const localizer = dayjsLocalizer(dayjs);

  const currentYear = dayjs().year();

  const handleNavigate = (newDate, view) => {
    console.log("handle navigate");
    const newYear = dayjs(newDate).year();

    if (newYear !== currentYear) {
      console.log("year changed");
      return false;
    }

    return true;
  };

  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.status) {
      case "pending":
        backgroundColor = "yellow";
        break;
      case "approved":
        backgroundColor = "green";
        break;
      case "cancelled":
        backgroundColor = "red";
        break;
      case "payment":
        backgroundColor = "purple";
        break;
      case "postponed":
        backgroundColor = "grey";
        break;

      case "not started":
        backgroundColor = "orange";
        break;
    }

    const style = {
      backgroundColor: backgroundColor,
      color: "black",
      height: "100%",
    };
    return {
      style: style,
    };
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        onNavigate={handleNavigate}
        events={events}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500, margin: 0, width: "100%" }}
      />
      <div className="legend">
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "yellow" }}
          ></div>
          <div className="legend-label">Pending</div>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "green" }}
          ></div>
          <div className="legend-label">Approved</div>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "red" }}
          ></div>
          <div className="legend-label">Cancelled</div>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "purple" }}
          ></div>
          <div className="legend-label">Payment</div>
        </div>
        <div className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: "grey" }}
          ></div>
          <div className="legend-label">Postponed</div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
