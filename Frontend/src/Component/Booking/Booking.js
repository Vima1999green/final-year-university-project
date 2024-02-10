import React, { useState, useEffect } from "react";
import Book_css from "./Booking.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Event_Img from "../../Images/booking_individual.jpg";
import Event_Img2 from "../../Images/event01.jpg";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
// import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Button from "@mui/material/Button";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



const Booking = () => {
  const [formType, setFormType] = useState("event");
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [applicantData, setApplicantData] = useState({
    userID: '',
    userNIC: '',
    organizationName: '',
    organizationAddress: '',
    designation: '',
    facility: '',
    bookingDate: '',
    Time: '',
    status: '',
    description: '',
    facilityId: '',
    deleteRequested: false,
    postponeRequested: false,

  });

  const currentDate = new Date();
  const shouldDisableDate = (date) => {
    // Disable dates earlier than the current date
    return date < currentDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    console.log(applicantData
        );
  };
  //------------------------------------------------
  // const [formFields, setFormFields] = useState([]);
  // const [formData, setFormData] = useState({});

  // const handleFieldChange = (fieldName, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: value,
  //   }));
  // };

  // const addField = () => {
  //   const newField = `Field_${formFields.length + 1}`;
  //   setFormFields((prevFields) => [...prevFields, newField]);
  // };

  // const removeField = (fieldName) => {
  //   setFormFields((prevFields) => prevFields.filter((field) => field !== fieldName));
  //   setFormData((prevData) => {
  //     const { [fieldName]: removedField, ...restData } = prevData;
  //     return restData;
  //   });
  // };

  // const saveToDatabase = () => {
  
  //   console.log("Saving to database:", formData);
  // };




  //----------------------------------------------------



  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch(
          "mongodb://localhost:27017/sportsunitproject"
        );
        const data = await response.json();

        // Assuming the data structure has 'name' and 'email' properties
        setApplicantData({
          name: data.name,
         
        });
      } catch (error) {
        console.error("Error fetching data from database:", error);
      }
    };

    fetchDataFromDatabase();
  }, [formType]);

  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  const renderEventForm = () => (
    <div className={Book_css.type01}>
      <div className={Book_css.left_event}>

      <label>
        User ID :
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          //value={applicantData.id}
          // Disable input to make it read-only
          // InputProps={{
          //   readOnly: true,
          // }}
          fullWidth
        />
        <br />
      </label>

      <label>
        User NIC :
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
         
          fullWidth
          required
        />
        <br />
      </label>

      <label>
          Name of Organization:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            fullWidth
          />
        </label>
        <br />

        <label>
          Address of Organization:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            multiline
            fullWidth
          />
          <br />
        </label>
        <br />
        <label>
          Designation:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            
            fullWidth
          />
          <br />
        </label>
        <br />
        <label>
          Facility :
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            
            // Disable input to make it read-only
           
            fullWidth
          />
          <br />
        </label>
        <br />
        
        
        <label>
          Booking Date:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            fullWidth
          />
          <br />
        </label>
        <br />
        <label>
          Time:
          
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField
          
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="hh:mm a"
        />
      </DemoContainer>
    </LocalizationProvider>
          <br />
        </label>
        <br />
        <label>
         Status:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            fullWidth
          />
          <br />
        </label>
        <br />

        <label>
         Description:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            fullWidth
            multiline
          />
          <br />
        </label>
        <br />
        <label>
         Facility ID:
          <TextField
            id="filled-basic"
            variant="filled"
            size="small"
            fullWidth
            
          />
          <br />
        </label>
        <br />

        <Button variant="contained" color="primary"style={{ textAlign: 'left', marginLeft: 0 ,float:'right'}}>Submit</Button><br/>
        
      </div>
      <div className={Book_css.right_event}>
        {/* <img
          src={Event_Img2}
          alt="Event Image"
          style={{ width: "350px" }}
          className={Book_css.eventImage}
        /> */}
        <h3 style={{color:'black'}}>Select your booking date here!</h3>
        <div className={Book_css.right_event_calender}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
   
    </div>
      </div>
    </div>
  );

  const renderIndividualPracticeForm = () => (
    <div className={Book_css.type01}>
      <div className={Book_css.left_event}>

      
      <br />

      {/* <label>
        Name of Applicant:
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          value={applicantData.name}
          // Disable input to make it read-only
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <br />
      </label>
      <br />
      <label>
        Email :
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          value={applicantData.email}
          // Disable input to make it read-only
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <br />
      </label>
      <br />
      <label>
        Contact No:
        <TextField
          id="contact-number"
          variant="filled"
          size="small"
          fullWidth
        />
        <br />
      </label>
      <br />
      <label>
        Cost :
        <TextField
          fullWidth
          name="cost"
          label=""
          variant="filled"
          color="primary"
          type="number"
          value={applicantData.cost}
          InputProps={{
            readOnly: true,
          }}
        />
      </label><br/>
       */}

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
              For individual Practice
            </label>
          </div>

          {formType === "event"
            ? renderEventForm()
            : renderIndividualPracticeForm()}
        </form>
      </div>
      </div>
    </div>
  );
};

export default Booking;