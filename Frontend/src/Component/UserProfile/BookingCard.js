import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";

const BookingCard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     let response;
    //     if (
    //       userType === "admin" ||
    //       userType === "DVC" ||
    //       userType === "Director"
    //     ) {
    //       response = await axios.get(
    //         "http://localhost:4000/api/booking/getAllBookings"
    //       );
    //     } else if (userType === "university") {
    //       response = await axios.get(
    //         "http://localhost:4000/api/booking/getBooking/:userID"
    //       );
    //     }
    //     console.log("res", response.data);
    //     setBookings(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   }
    // };

    fetchUserData();
    fetchBookings();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData();
    console.log(data);
    if (data) {
      setUserData(data);
    }
    if (isEmpty(data) || data === "Unauthorized") {
      console.log(isEmpty(data));
      navigate("/login");
    }
  };

  const fetchBookings = async () => {
    await axios
      .get("http://localhost:4000/api/booking/getAllBookings")
      .then((response) => {
        console.log(response.data);
        if (userType === "admin" || "director" || "dvc") {
          setBookings(response.data);
          setLoading(false);
        }
      })

      .catch((error) => {
        console.error("Error fetching booking data", error);
      });
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        bookings.map((booking, index) => (
          <Card
            key={index}
            sx={{ minWidth: 275, margin: "10px" }}
            variant="outlined"
          >
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Organization : {booking.organizationName}
                <br></br>
                Facility : {booking.facility}
                <br></br>
                Date : {new Date(booking.date).toLocaleDateString()}
                <br />
                Time : {booking.Time}
                <br />
                <br />
                Status : {booking.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default BookingCard;
