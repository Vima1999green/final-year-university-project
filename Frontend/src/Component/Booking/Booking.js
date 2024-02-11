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

// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import  Calendar  from '../Calendar/Calendar'; 






const Booking = () => {
  //select form type (individual or event)
  const [formType, setFormType] = useState("event");
  const [selectedFacility, setSelectedFacility] = useState('');
  const [facilities,setFacilities] = useState([]);
  const [bookings,setBookings] = useState([]);
  

  

  
  // const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  const [value, setValue] = useState(dayjs(new Date()));
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  const [applicantData, setApplicantData] = useState({
    userNIC: "",
    organizationName: "",
    organizationAddress: "",
    designation: "",
    facility: "",
    bookingDate: "",
    Time: "",
    description: "",
    facilityId: "",
  });


  const currentDate = new Date();
  const shouldDisableDate = (date) => {
    return date < currentDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if any required field is empty
  const requiredFields = ["userNIC", "organizationName", "organizationAddress", "designation", "facility", "bookingDate", "Time", "description", "facilityId"];
  const emptyFields = requiredFields.filter(field => !applicantData[field]);

  if (emptyFields.length > 0) {
    alert(`Please fill in the following required fields: ${emptyFields.join(', ')}`);
    return;
  }

    console.log(applicantData);

  
    
  };

  // get selected date from calender

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    
    setApplicantData({ ...applicantData, bookingDate: date.format("YYYY-MM-DD") });
    console.log("Updated applicantData:", { ...applicantData, bookingDate: date.format("YYYY-MM-DD") });
  };
  
  useEffect(()=>{
    const fetchFacilities = async ()=>{
      await axios.get('http://localhost:4000/api/facility/getAllFacilities')
            .then(response=>{
              console.log(response.data)
              setFacilities(response.data)
            })
            .catch(error=>{
              console.error(error)
            })

    };

    const fetchBookings = async () =>{
      await axios.get('http://localhost:4000/api/booking/getAllBookings')
              .then((response)=>{
                console.log(response.data)
                
                
                  setBookings(response.data);
              })

              .catch(error=>{
                console.error('Error fetching booking data',error);
              })
  };
    fetchFacilities();
    fetchBookings();
  },[]);

 

  const handleFacilitySelect = (event) => {
    console.log('in facility select');
    let facility  = event.target.value;
    setSelectedFacility(facility);
    console.log(selectedFacility)
    filterBookings(selectedFacility);
    
  };
  

  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  const filterBookings=(facility)=>{
    if(facility===selectedFacility)return;
      setSelectedFacility(facility)
  };

  const filteredBookings = selectedFacility ? 
      bookings.filter(booking=>booking.facility===selectedFacility):
      bookings
 
  
  

  //event form 01-------------------
  const renderEventForm = () => (
    <div className={Book_css.type01}>
      <form  >
        <div className={Book_css.left_event}>
        <label>
        Facility :
        <Select value={selectedFacility}  onChange={handleFacilitySelect} variant="filled" size="small"  required id="facility-select" fullWidth placeholder="select">
         
          {console.log(facilities)}
          {facilities.map(facility=>{
            return(
            <MenuItem key={facility._id} value={facility.name} style={{ color: 'black' }}>{facility.name}</MenuItem>
            );
          })}
         
        </Select>
        <br />
      </label>
      <br/>

      <label>
  Booking Date:
  
  <TextField
    id="filled-basic"
    variant="filled"
    size="small"
    value={applicantData.bookingDate}
    onChange={(e)=>setApplicantData({ ...applicantData, bookingDate: e.target.value })}
    fullWidth
    
    
  />
  <br />
</label>

    
          <label>
            Time:<br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimeField", "TimeField", "TimeField"]} >
              
                <TimeField
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  format="hh:mm a" />
                
              </DemoContainer>
            </LocalizationProvider>
          </label>
          <br/>
         
          

          <label> 
            User NIC :<br/>
            <TextField type="file" /> <br />
          </label>
              
          <label>
            Name of Organization:
            <TextField id="filled-basic"  variant="filled" size="small" fullWidth  required/> <br />
          </label>

          <label>
            Address of Organization:
            <TextField id="filled-basic" variant="filled" size="small" fullWidth multiline required/> <br />
          </label>
        
          <label>
            Designation:
            <TextField id="filled-basic" variant="filled" size="small" fullWidth  required/> <br />
          </label><br/>

          
         
          <br/>
          {/* <label>
            Booking Date:
            <TextField id="filled-basic" variant="filled" size="small" fullWidth value={
                selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""} readOnly/><br/>
          </label>  */}
         
         
   
          <label>
            Description:
            <TextField id="filled-basic" variant="filled" size="small" fullWidth  required/> <br />
          </label>
              
             
          <br />
         
          <label>
            Permission Letter:<br/>
          <TextField type="file" />
            {/* <Button variant="contained" color="primary" component="span">   Upload    </Button> */}
          </label>
          <br />

          <Button variant="contained" color="warning" style={{ textAlign: "left", marginBottom: "15px", float: "right" }} onClick={handleSubmit}>
            Submit Your Booking
          </Button>
          <br />
        </div>
        
        {/* --------- Booking calender  ------------- */}

        
         
         
        

          
          
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onDateSelect={handleDateSelect} />
            </LocalizationProvider> */}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs} style={{color:'black'}}>
      <DemoContainer
      style={{color:'black'}}
        components={[
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
       
        <DemoItem style={{color:'black'}}>
          <StaticDatePicker defaultValue={dayjs('2022-04-17')} style={{color:'black'}}/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> */}

    
            
          
        
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
     <TopNav/>

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

                <h2  style={{color: "red", fontSize: "24px",fontFamily: "inherit", }} >
                  Select your booking date from here!
                </h2>

                
                <Calendar style={{ backgroundColor: 'white' }} bookings={filteredBookings} />

    

                 
              </div>

              {formType === "event"  ? renderEventForm() : renderIndividualPracticeForm()}
             
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
