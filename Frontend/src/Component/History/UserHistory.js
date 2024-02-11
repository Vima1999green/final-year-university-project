import userHistory_css from "./userHistory.module.css";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

const UserHistory = () => {
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response =
          await axios.get(/*"http://localhost:3001/api/booking"*/);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, []);

  return (
    <div>
      <TopNav />
      <div className={userHistory_css.content}>
        <div className={userHistory_css.contentImage}>
          <div className={userHistory_css.body}>
            <Grid item xs={12}>
              <Grid>
                <h4>My booking List</h4>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead className={userHistory_css.tableHead}>
                      <TableRow>
                        <TableCell>Organization</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Facility</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Event Title</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={userHistory_css.tableBody}>
                      {customerDetails.map((customerDetail, index) => (
                        <TableRow key={index}>
                          <TableCell>{customerDetail.organization}</TableCell>
                          <TableCell>{customerDetail.name}</TableCell>
                          <TableCell>{customerDetail.facility}</TableCell>
                          <TableCell>{customerDetail.date}</TableCell>
                          <TableCell>{customerDetail.eventTitle}</TableCell>
                          <TableCell>
                            {customerDetail.status
                              ? "Finished"
                              : "Not Finished"}
                          </TableCell>
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
