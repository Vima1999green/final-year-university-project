import { useEffect, useState } from "react";
import landPage_css from "./land.module.css";
import TopNav from "../TopNav/TopNav";
import {
  ImageList,
  ImageListItem,
  Grid,
  Button,
  CardActionArea,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import sport1 from "../../Images/sports1.jpg";
import sport2 from "../../Images/sports2.jpg";
import sport3 from "../../Images/sports3.jpg";
import sport4 from "../../Images/sports4.jpg";
import sport5 from "../../Images/sports5.jpg";
import sport6 from "../../Images/sports6.jpg";
import booking from "../../Images/booking.jpeg";
import membership from "../../Images/membership.jpg";
import notification from "../../Images/notification.jpg";
import calendar from "../../Images/calendar.jpeg";
import Calendar from "../Calendar/Calendar";
import axios from 'axios';


const LandPage = () => {
  const [value, setValue] = useState(new Date());
  const [bookings,setBookings] = useState([]);
  const [clickedFacility,setClickedFacility] = useState(null);

  //useEffect to  fetch all the booking  data from backend server
  useEffect(()=>{
    fetchBookings();
  },[]);

  const fetchBookings = async () =>{
      await axios.get('http://localhost:4000/api/booking/getAllBookings')
              .then((response)=>{
                console.log(response.data)
                
                
                  setBookings(response.data);
              })

              .catch(error=>{
                console.error('Error fetching booking data',error);
              })
  }

  const filterBookings=(facility)=>{
    if(facility===clickedFacility)return;
      setClickedFacility(facility)
  };

  const filteredBookings = clickedFacility ? 
      bookings.filter(booking=>booking.facility===clickedFacility):
      bookings



  return (
    <div>
      <TopNav />

      <div className={landPage_css.content}>
        <div className={landPage_css.contentImage}>
          <div className={landPage_css.body}>
            <Grid container spacing={2} direction="column">
              <Grid container spacing={0} direction="raw">
                <Grid className={landPage_css.calendarContainer}>
                    <Grid item xs={12} md={8} >
                      <Calendar bookings={filteredBookings}/>

                    </Grid>

                </Grid>
               

                <Grid className={landPage_css.buttonContainer} lg={3} md={6}>
                  <Grid className={landPage_css.overAllCalendarbtnConatiner}>
                    <Button
                      className={landPage_css.overallBtn}
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={()=>filterBookings(null)}
                    >
                      Overall Calendar
                    </Button>
                  </Grid>
                  <Grid className={landPage_css.playgroundbtnConatiner}>
                    <Button
                      className={landPage_css.playgroundBtn}
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={()=>filterBookings('playground')}
                    >
                      Playground
                    </Button>
                  </Grid>
                  <Grid className={landPage_css.gymnasiumbtnConatiner}>
                    <Button
                      className={landPage_css.gymnasiumBtn}
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={()=>filterBookings('gymnasium')}
                    >
                      Gymnasium
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                <ImageList
                  className={landPage_css.imageListContainer}
                  cols={3}
                  rowHeight={160}
                >
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.img}
                      className={landPage_css.ImageListItem}
         
                    >
                      <img src={`${item.img}`} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              cols={4}
              className={landPage_css.cardHolder}
            >
              <Grid item xs={12} md={3}>
                <Card sx={{ maxWidth: 275 }} className={landPage_css.card}>
                  <CardMedia
                    className={landPage_css.cardMedia}
                    component="img"
                    image={booking}
                  />
                  <CardContent>
                    <h2 className={landPage_css.cardText}>
                      Real time Booking Facility
                    </h2>
                    <p className={landPage_css.cardDesc}>
                      Streamline your booking process with well structured our
                      platform
                    </p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ maxWidth: 275 }} className={landPage_css.card}>
                  <CardMedia
                    className={landPage_css.cardMedia}
                    component="img"
                    image={membership}
                  />
                  <CardContent>
                    <h2 className={landPage_css.cardText}>
                      Granting Membership
                    </h2>
                    <p className={landPage_css.cardDesc}>
                      Create your member ship with ease to enjoy with our
                      facilities{" "}
                    </p>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ maxWidth: 275 }} className={landPage_css.card}>
                  <CardMedia
                    className={landPage_css.cardMedia}
                    component="img"
                    image={notification}
                  />
                  <CardContent>
                    <h2 className={landPage_css.cardText}>
                      Notification system
                    </h2>
                    <p className={landPage_css.cardDesc}>
                      Get notifications instantly with our system
                    </p>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ maxWidth: 275 }} className={landPage_css.card}>
                  <CardMedia
                    className={landPage_css.cardMedia}
                    component="img"
                    image={calendar}
                  />
                  <CardContent>
                    <h2 className={landPage_css.cardText}>
                      Reservation calendar
                    </h2>
                    <p className={landPage_css.cardDesc}>
                      Make your booking faster and see existing booking
                      comfortably with calendar
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

const itemData = [
  {
    img: sport1,
  },
  {
    img: sport2,
  },
  {
    img: sport3,
  },
  {
    img: sport4,
  },
  {
    img: sport5,
  },
  {
    img: sport6,
  },
];

export default LandPage;