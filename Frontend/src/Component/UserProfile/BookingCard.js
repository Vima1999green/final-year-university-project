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
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, [userRole]);

  const fetchUserData = async () => {
    const data = await getUserData();
    console.log(data);

    if (data) {
      setUserData(data);
      setUserID(data.id);
      setUserRole(data.userType);
      console.log(userRole);
    }
    if (isEmpty(data) || data === "Unauthorized") {
      console.log(isEmpty(data));
      navigate("/login");
    }
  };

  const fetchBookings = async () => {
    if (userRole === "admin" || userRole === "director" || userRole === "dvc") {
      await axios
        .get("http://localhost:4000/api/booking/getAllBookings")
        .then((response) => {
          console.log(response.data);
          setBookings(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching booking data", error);
        });
    }
    if (userRole === "Guest") {
      await axios
        .get(`http://localhost:4000/api/booking/getBooking/${userID}`)

        .then((response) => {
          console.log(response.data);
          setBookings(response.data);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Error fetching booking data", error);
        });
    }
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
