import userHistory_css from "./userHistory.module.css";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const UserHistory = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [bookingDetails, setBookingDetails] = useState([]);

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
          setBookingDetails(response.data);
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
          setBookingDetails(response.data);
        })

        .catch((error) => {
          console.error("Error fetching booking data", error);
        });
    }
  };

  return (
    <div>
      <TopNav />
      <div className={userHistory_css.content}>
        <div className={userHistory_css.contentImage}>
          <div className={userHistory_css.body}>
            <Grid item xs={12} style={{ width: "100%" }}>
              <Grid>
                <h2 style={{ color: "black" }}> booking List</h2>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead className={userHistory_css.tableHead}>
                      <TableRow>
                        <TableCell className={userHistory_css.tableCell}>
                          Organization
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Address
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Facility
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Date
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Time
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Description
                        </TableCell>
                        <TableCell className={userHistory_css.tableCell}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={userHistory_css.tableBody}>
                      {bookingDetails.map((bookingDetail, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {bookingDetail.organizationName}
                          </TableCell>
                          <TableCell>
                            {bookingDetail.organizationAddress}
                          </TableCell>
                          <TableCell>{bookingDetail.facility}</TableCell>
                          <TableCell>{bookingDetail.bookingDate}</TableCell>
                          <TableCell>{bookingDetail.Time}</TableCell>
                          <TableCell>{bookingDetail.description}</TableCell>
                          <TableCell>{bookingDetail.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
