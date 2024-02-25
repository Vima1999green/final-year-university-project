import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import YearPlan_css from "./YearPlan.module.css";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useEffect } from "react";
import axios from "axios";
import TopNav from "../TopNav/TopNav";

const YearPlan = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [facility, setFacility] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [values, setValues] = useState({
    eventName: "",
    description: "",
    facility: "",
    status: "not started",
  });

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, [userRole]);

  const fetchUserData = async () => {
    const data = await getUserData();
    console.log(data);
    if (isEmpty(data) || data === "Unauthorized" || data === "undefined") {
      console.log(isEmpty(data));
      navigate("/login");
    }
    if (data) {
      setUserData(data);
      setUserRole(data.userType);
    }
  };

  const fetchBookings = async () => {
    await axios
      .get("http://localhost:4000/api/booking/getAllBookings")
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching booking data", error);
      });
  };
  const handleInput = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });

    if (event.target.name === "eventName") setEventName(event.target.value);
    if (event.target.name === "description") setEventDesc(event.target.value);

    if (event.target.name === "facility") setFacility(event.target.value);

    if (event.target.name === "status") setEventStatus(event.target.value);
  };

  const onChangeHandler = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClear = () => {
    console.log("handleClear");
    setEventName("");
    setEventDesc("");
    setFacility("");
    setEventStatus("");
    setEventDates([]);
  };

  return (
    <div>
      <TopNav />
      <div className={YearPlan_css.content}>
        <div className={YearPlan_css.contentImage}>
          <div className={YearPlan_css.body}>
            <h1 style={{ color: "black" }}>Our Year Plan</h1>

            <div className={YearPlan_css.calendarContainer}>
              <Calendar
                style={{ backgroundColor: "white" }}
                bookings={bookings}
              />
            </div>

            <div className={YearPlan_css.buttonContainer}>
              {userRole === "director" ? (
                <Button
                  variant="contained"
                  sx={{ width: "100%" }}
                  className={YearPlan_css.button}
                  onClick={handleClickOpen}
                >
                  Add Event
                </Button>
              ) : (
                <div></div>
              )}
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              className={YearPlan_css.dialogBox}
            >
              <DialogTitle>Add Event</DialogTitle>
              <DialogContent>
                <div className={YearPlan_css.formContainer}>
                  <div>
                    <label>Event Name : </label>
                    <TextField
                      fullWidth
                      name="eventName"
                      label=""
                      variant="filled"
                      color="primary"
                      value={values.eventName}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label>Event Description : </label>
                    <TextField
                      fullWidth
                      name="description"
                      label=""
                      variant="filled"
                      color="primary"
                      value={values.eventDesc}
                      onChange={handleInput}
                    />
                  </div>
                  <br></br>

                  <div>
                    <label>Event Dates : </label>
                    <DatePicker
                      id="dateStartEnd"
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={onChangeHandler}
                      dateFormat="dd MMM yyyy"
                      className={"form-control form-control-sm"}
                      showDisabledMonthNavigation
                      minDate={new Date()} // Disable dates before today
                    />
                  </div>
                  <br></br>

                  <div>
                    <label>Location : </label>
                    <TextField
                      fullWidth
                      name="facility"
                      label=""
                      variant="filled"
                      color="primary"
                      value={values.facility}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label>Event status : </label>
                    <TextField
                      fullWidth
                      name="status"
                      label=""
                      variant="filled"
                      color="primary"
                      value={values.eventStatus}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button>Add</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearPlan;
