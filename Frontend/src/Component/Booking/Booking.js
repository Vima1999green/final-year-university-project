import React, { useState, useEffect, Route } from "react";
import { useNavigate } from "react-router-dom";
import Book_css from "./Booking.module.css";
import TextField from "@mui/material/TextField";
import Event_Img from "../../Images/booking_individual.jpg";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TopNav from "../TopNav/TopNav";
import axios from "axios";
import isEmpty from "../../Support/isEmpty";
import Calendar from "../Calendar/Calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getUserData from "../../Support/getUserData";

const Booking = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("event");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [universityEvents, setUniversityEvents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedFacilityID, setSelectedFacilityID] = useState("");
  const [value, setValue] = useState(dayjs(new Date()));
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [orgContact, setOrgContact] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [applicantData, setApplicantData] = useState({
    organizationName: "",
    organizationAddress: "",
    designation: "",
    facility: "",
    bookingDate: "",
    Time: "",
    description: "",
    contact: "",
    applicantName: "",
  });

  const [bookingDates, setBookingDates] = useState([]);

  //------------

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchUserData();

    fetchFacilities();
    fetchBookings();
    fetchUniversityEvents();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData();
    console.log(data);
    if (isEmpty(data) || data === "Unauthorized") {
      console.log(isEmpty(data));
      navigate("/login");
    }
    if (data) {
      setUserData(data);
      setUserID(data.id);
    }
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

  const onChangeHandler = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };
  //-------------
  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/userData");
  //     setName(response.data.name);
  //   } catch (error) {
  //     console.error("Error fetching user data", error);
  //   }
  // };

  const handleInput = (event) => {
    event.preventDefault();
    setApplicantData({
      ...applicantData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "organization") setOrgName(event.target.value);
    if (event.target.name === "address") setOrgAddress(event.target.value);
    if (event.target.name === "bookingTime") setValue(event.target.value);
    if (event.target.name === "designation") setDesignation(event.target.value);
    if (event.target.name === "description")
      setBookDescription(event.target.value);

    if (event.target.name === "contact") setBookDescription(event.target.value);
    if (event.target.name === "name") setApplicantName(event.target.value);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files.length === 1) {
      setSelectedFile(event.target.files[0]);
      setSelectedLetter(event.target.files[0]);
    } else {
      console.log("File changed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("===========");
    console.log("----------------------------------------");
    console.log(selectedFacility);

    while (startDate <= endDate) {
      bookingDates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    const formData = {
      email: email,
      userID: userID,
      userNICImg: "",
      permissionLetter: "",
      facilityId: selectedFacilityID,
      facility: selectedFacility,
      organizationName: orgName,
      status: "pending",
      organizationAddress: orgAddress,
      designation: designation,
      description: bookDescription,
      bookingDate: bookingDates.map((date) => date.toISOString()),
      Time: value,
      Contact: orgContact,
      Name: applicantName,
    };
    console.log(formData);
    let bookingID = "";
    const token = JSON.parse(localStorage.getItem("facilityUser")).token;
    await axios
      .post("http://localhost:4000/api/booking/createBooking", formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        bookingID = response.data._id;
        console.log("bookingID", bookingID);
        alert("Booking submitted successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data.message);
          console.log("Error alert");
          return;
        }
      });
    console.log(selectedFile);
    console.log(selectedLetter);
    if (!isEmpty(bookingID)) {
      try {
        await uploadNIC(bookingID, selectedFile);
        console.log("NIC uploaded successfully");
      } catch (error) {
        console.log(error.message);
        alert(error.message + "\r\n" + "Uploading NIC failed");
        return;
      }
      try {
        await uploadPermissionLetter(bookingID, selectedLetter);
        console.log("Letter uploaded successfully");
      } catch (error) {
        console.log(error.message);
        alert(error.message + "\r\n" + "Uploading permission letter failed");
        return;
      }
    }
  };

  const uploadNIC = async (bookingID, imageFile) => {
    console.log(imageFile);
    console.log(bookingID);
    const formData = new FormData();
    formData.append("nicPhoto", imageFile);
    const token = JSON.parse(localStorage.getItem("facilityUser")).token;
    console.log(token);
    await axios
      .post(
        `http://localhost:4000/api/booking/uploadNIC/${bookingID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Upload success");
        alert(res.data);
      })
      .catch((error) => {
        console.log("Upload Failed");
        alert(error.response.data);
      });
  };

  const uploadPermissionLetter = async (bookingID, imageFile) => {
    const formData = new FormData();
    formData.append("letter", imageFile);
    const token = JSON.parse(localStorage.getItem("facilityUser")).token;
    await axios
      .post(
        `http://localhost:4000/api/booking/uploadLetter/${bookingID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("Upload success");
        alert(res.data);
      })
      .catch((error) => {
        console.log("Upload Failed");
        alert(error.response.data);
      });
  };

  const handleDateSelect = (date) => {
    setApplicantData({
      ...applicantData,
      bookingDate: date.format("YYYY-MM-DD"),
    });
    console.log("Selected Date:", date.format("YYYY-MM-DD"));
  };

  const handleFacilitySelect = (event) => {
    facilities.forEach((facility) => {
      if (facility.name === event.target.value) {
        setSelectedFacility(facility.name);
        setSelectedFacilityID(facility._id);
      }
    });
    filterBookings(selectedFacility);
  };

  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  const filterBookings = (facility) => {
    if (facility === selectedFacility) return;
    setSelectedFacility(facility);
  };

  const filteredBookings = selectedFacility
    ? bookings.filter((booking) => booking.facility === selectedFacility)
    : bookings;

  const renderEventForm = () => (
    <div className={Book_css.type01}>
      <form>
        <div className={Book_css.left_event}>
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
          <label>
            Booking Date:
            <br />
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
          </label>
          <br />
          <label>
            Time:
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                name="bookingTime"
                value={dayjs(value)}
                onChange={(newValue) => setValue(newValue)}
                format="hh:mm a"
              />
            </LocalizationProvider>
          </label>
          <br />
          <label>
            User NIC :<br />
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleFileChange}
              name="img"
            />{" "}
            <br />
          </label>

          <label>
            Name with Initials:
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              value={applicantData.name}
              onChange={handleInput}
              name="name"
              fullWidth
              required
              autoComplete="true"
            />{" "}
            <br />
          </label>

          <label>
            Name of Organization:
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              value={applicantData.orgName}
              onChange={handleInput}
              name="organization"
              fullWidth
              required
              autoComplete="true"
            />{" "}
            <br />
          </label>
          <label>
            Address of Organization:
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              value={applicantData.orgAddress}
              name="address"
              onChange={handleInput}
              fullWidth
              multiline
              required
              autoComplete="true"
            />
            <br />
          </label>

          <label>
            Designation:
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              value={applicantData.designation}
              name="designation"
              onChange={handleInput}
              fullWidth
              required
              autoComplete="true"
            />{" "}
            <br />
          </label>
          <label>
            Contact No :
            <TextField
              id="filled-basic"
              variant="filled"
              inputProps={{
                maxLength: 10,
              }}
              size="small"
              value={applicantData.contact}
              name="contact"
              onChange={handleInput}
              fullWidth
              required
              autoComplete="true"
            />{" "}
            <br />
          </label>
          <label>
            Event Description:
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.bookDescription}
              name="description"
              onChange={handleInput}
              fullWidth
              required
              autoComplete="true"
            />{" "}
            <br />
          </label>
          <label>
            Permission Letter:
            <br />
            <input
              accept="image/*,.pdf"
              type="file"
              multiple
              onChange={handleFileChange}
              name="img"
            />
          </label>
          <br />

          <br />
        </div>
      </form>
      <div className={Book_css.right_event}>
        <h2
          className={Book_css.bookText}
          style={{ color: "red", fontSize: "24px", fontFamily: "inherit" }}
        >
          Search for your booking date from here!
        </h2>
        <Calendar
          style={{ backgroundColor: "white" }}
          bookings={filteredBookings}
          universityEvents={universityEvents}
          onSelectDate={handleDateSelect}
          date={dayjs("2023-12-19T12:00:00").toDate()}
        />
        <br />
        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ textAlign: "left", marginBottom: "15px", float: "left" }}
          onClick={handleSubmit}
        >
          Submit Your Booking
        </Button>
      </div>
    </div>
  );

  const renderIndividualPracticeForm = () => (
    <div className={Book_css.type01}>
      <div className={Book_css.left_event}>
        <br />
      </div>
      <div className={Book_css.right_event}>
        <img
          src={Event_Img}
          alt="Event Image"
          style={{ width: "300px" }}
          className={Book_css.eventImage}
        />
      </div>
    </div>
  );

  return (
    <div>
      <TopNav />
      <div className={Book_css.container}>
        <div className={Book_css.contentImage}>
          <div className={Book_css.content}>
            <form onSubmit={handleSubmit}>
              <div className={Book_css.header}>
                <h2>Lets Make Your Reservation </h2>
              </div>
              <div className={Book_css.type}>
                <label>
                  <input
                    type="radio"
                    value="event"
                    checked={formType === "event"}
                    onChange={handleRadioChange}
                  />
                  For event
                </label>
              </div>
              <div className={Book_css.type}>
                <label>
                  <input
                    type="radio"
                    value="address"
                    checked={formType === "address"}
                    onChange={handleRadioChange}
                  />
                  For individual practice
                </label>
              </div>
              {formType === "event"
                ? renderEventForm()
                : renderIndividualPracticeForm()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
