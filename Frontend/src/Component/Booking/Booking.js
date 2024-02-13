import React, { useState, useEffect } from "react";
import Book_css from "./Booking.module.css";

import TextField from "@mui/material/TextField";
import Event_Img from "../../Images/booking_individual.jpg";

import Button from "@mui/material/Button";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TopNav from "../TopNav/TopNav";
import axios from 'axios';
import isEmpty from '../../isEmpty';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import Calendar from '../Calendar/Calendar';






const Booking = () => {
  //select form type (individual or event)
  const [formType, setFormType] = useState("event");
  const [selectedFacility, setSelectedFacility] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedFacilityID, setSelectedFacilityID] = useState('');





  // const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [value, setValue] = useState(dayjs(new Date()));
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  const [orgName, setOrgName] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [bookDate, setBookDate] = useState(new Date().toString());
  const [bookDescription, setBookDescription] = useState('');
  const [applicantData, setApplicantData] = useState({

    organizationName: "",
    organizationAddress: "",
    designation: "",
    facility: "",
    bookingDate: "",
    Time: "",
    description: "",

  });


  // const currentDate = new Date();
  // const shouldDisableDate = (date) => {
  //   return date < currentDate;
  // };


  const handleInput = (event) => {
    event.preventDefault();
    setApplicantData({ ...applicantData, [event.target.name]: event.target.value });

    if (event.target.name === 'organization')
      setOrgName(event.target.value)
    if (event.target.name === 'bookingDate')
      setBookDate(event.target.value)

    if (event.target.name === 'address')
      setOrgAddress(event.target.value)

    if (event.target.name === 'bookingTime')
      setValue(event.target.value)

    if (event.target.name === 'designation')
      setDesignation(event.target.value)

    if (event.target.name === 'description')
      setBookDescription(event.target.value)



  };
  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files.length ===1) {
      setSelectedFile( event.target.files[0])
      setSelectedLetter(event.target.files[0])
    } else {
       console.log('File changed')
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('facilityUser'))
    console.log(userData)
    console.log('===========');
    // console.log(applicantData);
    console.log('----------------------------------------')
    console.log(selectedFacility)
    const formData = {
      userID: userData.userDetails.id,
      facilityId: selectedFacilityID,
      facility: selectedFacility,
      organizationName: orgName,
      status: 'pending',
      organizationAddress: orgAddress,
      designation: designation,
      description: bookDescription,
      bookingDate: bookDate,
      Time: value
    }
    console.log(formData)
    let bookingID = '';
    await axios.post('http://localhost:4000/api/booking/createBooking', formData, {
      headers: {
        Authorization: userData.token
      }
    })


      .then(response => {
        bookingID = response.data._id;
        console.log('bookingID', bookingID);
        alert('Booking submitted suceesfully');

      })

      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          alert(error.response.data.message)
          console.log('Error alert')
          return
        }
      })
    console.log('++++++++++++++++++++++++++++++')
    console.log(selectedFile)
    console.log(selectedLetter)
    console.log('++++++++++++++++++++++++++++++')
    //uploading Letter and NIC
    if (!isEmpty(bookingID)) {
      try {
        await uploadNIC(bookingID, selectedFile);
        console.log('NIC uploaded succesfully');
      } catch (error) {
        console.log(error.message)
        alert(error.message + '\r\n' + 'Uploading NIC failed');
        return
      }
      try {
        await uploadPermissionLetter(bookingID, selectedLetter);
        console.log('Letter uploaded succesfully')
      } catch (error) {
        console.log(error.message)
        alert(error.message + '\r\n' + 'Uploading permission letter failed');
        return
      }
    }





  };

  const uploadNIC = async (bookingID, imageFile) => {
    const formData = new FormData();



    // Append each image file to the FormData object
    // for (const file of imageFile) {
    formData.append('nicPhoto', imageFile);
    // }

    const token = JSON.parse(localStorage.getItem('facilityUser')).token
    await axios
      .post(`http://localhost:4000/api/booking/uploadNIC/${bookingID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            Authorization: token
          },
        })
      .then(res => {
        console.log('Uopload success')
        alert(res.data)
      })
      .catch(error => {
        console.log('Uopload Failes')
        alert(error.response.data)
      })
  };

  const uploadPermissionLetter = async (bookingID, imageFile) => {
    const formData = new FormData();




    // Append each image file to the FormData object
    // for (const file of imageFile) {
    formData.append('letter', imageFile);
    // }

    const token = JSON.parse(localStorage.getItem('facilityUser')).token
    await axios
      .post(`http://localhost:4000/api/booking/uploadLetter/${bookingID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            Authorization: token
          },
        })
      .then(res => {
        console.log('Uopload success')
        alert(res.data)
      })
      .catch(error => {
        console.log('Uopload Failes')
        alert(error.response.data)
      })
  };


  // get selected date from calender

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {

    setApplicantData({ ...applicantData, bookingDate: date.format("YYYY-MM-DD") });
    console.log("Updated applicantData:", { ...applicantData, bookingDate: date.format("YYYY-MM-DD") });
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      await axios.get('http://localhost:4000/api/facility/getAllFacilities')
        .then(response => {
          console.log(response.data)
          setFacilities(response.data)
        })
        .catch(error => {
          console.error(error)
        })

    };

    const fetchBookings = async () => {
      await axios.get('http://localhost:4000/api/booking/getAllBookings')
        .then((response) => {
          console.log(response.data)


          setBookings(response.data);
        })

        .catch(error => {
          console.error('Error fetching booking data', error);
        })
    };


    fetchFacilities();
    fetchBookings();
  }, []);



  const handleFacilitySelect = (event) => {
    console.log('in facility select');
    facilities.forEach(facility => {
      if (facility.name === event.target.value) {
        setSelectedFacility(facility.name)
        setSelectedFacilityID(facility._id)
      }
    });

    console.log(selectedFacility)

    filterBookings(selectedFacility)

  };


  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  const filterBookings = (facility) => {
    if (facility === selectedFacility) return;
    setSelectedFacility(facility)
  };

  const filteredBookings = selectedFacility ?
    bookings.filter(booking => booking.facility === selectedFacility) :
    bookings




  //event form 01-------------------
  const renderEventForm = () => (
    <div className={Book_css.type01}>
      <form  >
        <div className={Book_css.left_event}>
          <label>
            Facility :
            <Select value={selectedFacility} onChange={handleFacilitySelect} variant="filled" size="small" required id="facility-select" fullWidth placeholder="select">
              <MenuItem style={{ color: 'black' }}>Select facility</MenuItem>
              {console.log(facilities)}
              {facilities.map(facility => {
                return (
                  <MenuItem key={facility._id} value={facility.name} style={{ color: 'black' }}>{facility.name}</MenuItem>
                );
              })}

            </Select>
            <br />
          </label>
          <br />

          <label>
            Booking Date:

            <TextField
              name="bookingDate"
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.bookingDate}
              onChange={handleInput}
              aria-readonly
              fullWidth


            />



            <br />

          </label>


          <label>
            Time:<br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimeField", "TimeField", "TimeField"]} >

                <TimeField
                  name="bookingTime"
                  value={dayjs(value)}
                  onChange={(newValue) => setValue(newValue)}
                  format="hh:mm a" />

              </DemoContainer>
            </LocalizationProvider>
          </label>
          <br />



          <label>
            User NIC :<br />
            <input accept="image/*" type="file" multiple onChange={handleFileChange} name='img' /> <br />
          </label>

          <label>
            Name of Organization:
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.orgName}
              onChange={handleInput}
              name="organization"
              fullWidth
              required
              autoComplete="true" /> <br />
          </label>

          <label>
            Address of Organization:
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.orgAddress}
              name="address"
              onChange={handleInput}
              fullWidth
              multiline
              required
              autoComplete="true" /> <br />
          </label>

          <label>
            Designation:
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.designation}
              name="designation"
              onChange={handleInput}
              fullWidth
              required
              autoComplete="true" /> <br />
          </label><br />



          <br />
          {/* <label>
            Booking Date:
            <TextField id="filled-basic" variant="filled" size="small" fullWidth value={
                selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""} readOnly/><br/>
          </label>  */}



          <label>
            Description:
            <TextField
              id="filled-basic"
              variant="filled"
              size="small"
              value={applicantData.bookDescription}
              name="description"
              onChange={handleInput}
              fullWidth
              required
              autoComplete="true" /> <br />
          </label>


          <br />

          <label>
            Permission Letter:<br />
            <input accept="image/*,.pdf" type="file" multiple onChange={handleFileChange} name='img' />

            {/* <Button variant="contained" color="primary" component="span">   Upload    </Button> */}
          </label>
          <br />

          <Button variant="contained" color="warning" style={{ textAlign: "left", marginBottom: "15px", float: "right" }} onClick={handleSubmit}>
            Submit Your Booking
          </Button>
          <br />
        </div>

      </form>
    </div>
  );

  //individual event form 02---------

  const renderIndividualPracticeForm = () => (
    <div className={Book_css.type01}>
      <div className={Book_css.left_event}>
        <br />

        {/* form 02 content-------------------- */}

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
                  <input type="radio" value="event" checked={formType === "event"} onChange={handleRadioChange} />
                  For event
                </label>
              </div>
              <div className={Book_css.type}>
                <label>
                  <input type="radio" value="address" checked={formType === "address"} onChange={handleRadioChange} />
                  For individual practice
                </label>

                <h2 style={{ color: "red", fontSize: "24px", fontFamily: "inherit", }} >
                  Select your booking date from here!
                </h2>


                <Calendar style={{ backgroundColor: 'white' }} bookings={filteredBookings} onSelectDate={setSelectedDate} />




              </div>

              {formType === "event" ? renderEventForm() : renderIndividualPracticeForm()}


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
