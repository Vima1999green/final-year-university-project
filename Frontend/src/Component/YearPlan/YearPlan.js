import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import YearPlan_css from "./YearPlan.module.css";
import { Button, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const YearPlan = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilityID, setFacilityID] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [bookings, setBookings] = useState([]);
  const [universityEvents, setUniversityEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventDates, setEventDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [values, setValues] = useState({
    eventName: "",
    description: "",
    facility: "",
    status: "notstarted",
  });

  useEffect(() => {
    fetchUserData();
    fetchBookings();
    fetchUniversityEvents();
    fetchFacilities();
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
  const fetchFacilities = async () => {
    await axios
      .get("http://localhost:4000/api/facility/getAllFacilities")
      .then((response) => {
        console.log(response.data);
        setFacilities(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUniversityEvents = async () => {
    await axios
      .get("http://localhost:4000/api/universityEvent/getAllEvents")
      .then((response) => {
        console.log(response.data);
        setUniversityEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Events data", error);
      });
  };
  const handleInput = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });

    if (event.target.name === "eventName") setEventName(event.target.value);
    if (event.target.name === "description") setEventDesc(event.target.value);
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
  const handleRadioChange = (event) => {
    setEventStatus(event.target.value);
  };
  const handleClear = () => {
    console.log("handleClear");
    setEventName("");
    setEventDesc("");
    setEventStatus("");
    setEventDates([]);
  };
  const handleFacilitySelect = (event) => {
    facilities.forEach((facility) => {
      if (facility.name === event.target.value) {
        setSelectedFacility(facility.name);
      }
    });
  };

  const handleTableRowClick = (rowData) => {
    console.log(rowData);
    setValues({
      eventName: rowData.eventName,
      description: rowData.eventDesc,
      facility: rowData.facility,
      status: rowData.eventStatus,
    });
    setOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("========");

    while (startDate <= endDate) {
      eventDates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log(eventStatus);

    const formData = {
      eventName: eventName,
      eventDescription: eventDesc,
      eventDates: eventDates.map((eventDate) => eventDate.toISOString()),
      facility: selectedFacility,
      eventStatus: eventStatus,
    };

    console.log(formData);
    let eventID = "";
    const token = JSON.parse(localStorage.getItem("facilityUser")).token;
    await axios
      .post("http://localhost:4000/api/universityEvent/createEvent", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        eventID = response.data._id;
        console.log("eventID", eventID);
        alert("Event submitted successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data.message);
          console.log("Error alert");
          return;
        }
      });
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
                universityEvents={universityEvents}
              />
            </div>

            <div className={YearPlan_css.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead className={YearPlan_css.tableHead}>
                    <TableRow>
                      <TableCell className={YearPlan_css.tableCell}>
                        Event Name
                      </TableCell>

                      <TableCell className={YearPlan_css.tableCell}>
                        Facility
                      </TableCell>
                      <TableCell className={YearPlan_css.tableCell}>
                        Start Date
                      </TableCell>
                      <TableCell className={YearPlan_css.tableCell}>
                        End Date
                      </TableCell>
                      <TableCell className={YearPlan_css.tableCell}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={YearPlan_css.tableBody}>
                    {universityEvents.map((universityEvent, index) => (
                      <TableRow
                        key={index}
                        onClick={() => handleTableRowClick(universityEvent)}
                      >
                        <TableCell>{universityEvent.eventName}</TableCell>
                        <TableCell>{universityEvent.facility}</TableCell>
                        <TableCell>{universityEvent.eventDates[0]}</TableCell>
                        <TableCell>
                          {
                            universityEvent.eventDates[
                              universityEvent.eventDates.length - 1
                            ]
                          }
                        </TableCell>
                        <TableCell>{universityEvent.eventStatus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                    <br></br>
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
                      fullWidth
                    />
                  </div>
                  <br></br>

                  <div>
                    <label>
                      Facility :
                      <Select
                        value={selectedFacility}
                        onChange={handleFacilitySelect}
                        variant="filled"
                        size="small"
                        required
                        id="facility-select"
                        fullWidth
                        placeholder="select"
                      >
                        {facilities.map((facility) => {
                          return (
                            <MenuItem
                              key={facility._id}
                              value={facility.name}
                              style={{ color: "black" }}
                            >
                              {facility.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <br />
                    </label>
                    <br />
                  </div>

                  <div>
                    <label>Event status : </label>
                    <br></br>
                    <label>
                      <input
                        fullWidth
                        name="status"
                        type="radio"
                        value="notstarted"
                        checked={values.status === "notstarted"}
                        onChange={handleRadioChange}
                      />
                      Not Started
                    </label>
                    <br></br>

                    <label>
                      <input
                        fullWidth
                        type="radio"
                        value="started"
                        checked={values.eventStatus === "started"}
                        onChange={handleRadioChange}
                      />
                      Started
                    </label>
                    <br></br>

                    <label>
                      <input
                        fullWidth
                        type="radio"
                        value="finished"
                        checked={values.eventStatus === "finished"}
                        onChange={handleRadioChange}
                      />
                      Finished
                    </label>
                    <br></br>

                    <label>
                      <input
                        type="radio"
                        value="ongoing"
                        checked={values.eventStatus === "ongoing"}
                        onChange={handleRadioChange}
                      />
                      On going
                    </label>
                    <br></br>
                    <label>
                      <input
                        type="radio"
                        value="postponed"
                        checked={values.eventStatus === "postponed"}
                        onChange={handleRadioChange}
                      />
                      Postponed
                    </label>
                    <br></br>
                  </div>
                </div>
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearPlan;
