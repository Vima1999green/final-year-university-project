import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import alluser_css from './Profile.module.css';

const storedUserDetails = localStorage.getItem('facilityUser');
    const storedUser = JSON.parse(storedUserDetails);
    const userType = JSON.parse(storedUserDetails).userDetails.userType;

const fetchBookings = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/booking/getAllBookings');
    return response.data;
  } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
  }
};
    
    const BookingCard = () => {
      const [bookings, setBookings] = useState('');
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        // Fetch booking details when the component mounts
        const fetchData = async () => {
          try {
            const data = await fetchBookings();
            setBookings(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching bookings:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures this effect runs once on mount
    

      return (
        <Box  display="flex" flexWrap="wrap" justifyContent="center">
          {/* <Card variant="outlined"> */}
            {loading ? (
              <CardContent>
                <Typography variant="h5" component="div">
                  No Booking Details
                </Typography>
              </CardContent>
            ) : (
              <>
              {userType === 'admin' && (
                <>
                {bookings.map((booking,index) => (
                  <Card key={index} style={{ margin: '10px' ,maxWidth:275}}>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>                        
                        Booking ID: {booking.id}
                      </Typography>
                      <Typography variant="h5" component="div">
                        Facility: {booking.facility}
                      </Typography>
                      <Typography variant="body2">
                        Organization: {booking.organizationName}
                      </Typography>
                      <Typography variant="body2">
                        Date: {new Date(booking.bookingDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                          Time: {booking.Time}
                      </Typography>
                      <Typography variant="body2">
                          Status: {booking.status}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                ))}
              </>
            )}

            {userType === 'Guest' ||  userType === 'university' && (
              <>
                  {bookings
                      .filter(booking => booking.userID === storedUser.userDetails.userID)
                      .map((booking, index) => (
                          <Card key={index} style={{ margin: '10px', maxWidth: 275 }}>
                              <CardContent>
                                  <Typography color="text.secondary" gutterBottom>
                                      Booking ID: {booking.id}
                                  </Typography>
                                  <Typography variant="h5" component="div">
                                      Facility: {booking.facility}
                                  </Typography>
                                  <Typography variant="body2">
                                      Organization: {booking.organizationName}
                                  </Typography>
                                  <Typography variant="body2">
                                      Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="body2">
                                      Time: {booking.Time}
                                  </Typography>
                                  <Typography variant="body2">
                                      Status: {booking.status}
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Learn More</Button>
                              </CardActions>
                          </Card>
                      ))}
              </>
            )}

            {userType === 'DVC' || 'Director' && (
              <>
                  {bookings
                      .filter(booking => booking.userID === storedUser.userDetails.userID && booking.status === 'pending')
                      .map((booking, index) => (
                          <Card key={index} style={{ margin: '10px', maxWidth: 275 }}>
                              <CardContent>
                                  <Typography color="text.secondary" gutterBottom>
                                      Booking ID: {booking.id}
                                  </Typography>
                                  <Typography variant="h5" component="div">
                                      Facility: {booking.facility}
                                  </Typography>
                                  <Typography variant="body2">
                                      Organization: {booking.organizationName}
                                  </Typography>
                                  <Typography variant="body2">
                                      Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="body2">
                                      Time: {booking.Time}
                                  </Typography>
                                  <Typography variant="body2">
                                      Status: {booking.status}
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button size="small">Learn More</Button>
                              </CardActions>
                          </Card>
                      ))}
              </>
            )}
          </>
        )}
      </Box>
    );
  };
export default BookingCard;