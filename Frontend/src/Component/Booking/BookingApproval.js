import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import TopNav from "../TopNav/TopNav";
import axios from "axios";
import "./BookingAproval.css";
import moment from "moment";
import userType from "../../Support/getUserData";

const BookingApproval = ({ bookingDate, Time }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");

  const timeOnly = moment(Time).format("HH:mm");

  // const mockBookingWithImages = {
  //   organizationName: "Sample Organization",
  //   organizationAddress: "Sample Address",
  //   facility: "Sample Facility",
  //   bookingDate: "2024-02-24",
  //   Time: "14:00",
  //   designation: "Sample Designation",
  //   description: "Sample Description",
  //   status: "pending",
  //   userNICImg: "nic-image.jpg",
  //   permissionLetter: "permission-letter.pdf",
  // };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/booking/getAllBookings"
      );
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching booking data", error);
    }
    setComment("");
  };

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      key: "organizationName",
    },
    {
      title: "organization Address",
      dataIndex: "organizationAddress",
      key: "facility",
    },
    {
      title: "Selected Facility",
      dataIndex: "facility",
      key: "facility",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text, record) => (
        <ul>
          {record.bookingDate.map((date) => (
            <li key={date}>{moment(date).format("YYYY-MM-DD")}</li>
          ))}
        </ul>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button className="ant-btn" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
    setModalVisible(true); // Open the modal
  };

  const handleApprove = async () => {
    if (selectedBooking) {
      try {
        // Fetch user data using userID to get the email address
        const userResponse = await axios.get(
          `http://localhost:4000/api/users/getUserById/${selectedBooking.userID}`
        );

        const userEmail = userResponse.data.email;

        // Send approval email to the user
        await axios.post("http://localhost:4000/api/sendEmail", {
          to: userEmail,
          subject: "Booking Approved",
          heading: "Booking Approved",
          content: `Your booking request has been approved. Please upload your payment slip to the system (log in to the System -> go to History -> Click View details -> Click Upload Payment Slip ). Comment: ${comment}`,
        });

        alert("Approved Email Sends to the User");

        // Update booking status and comment in the database
        await axios.put(
          `http://localhost:4000/api/booking/approve/${selectedBooking._id}`,
          { comment }
        );

        // Fetch updated bookings data
        fetchBookings();

        // Close the modal
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error approving booking", error);
      }
    }
  };

  const handleReject = async () => {
    if (selectedBooking) {
      try {
        const userResponse = await axios.get(
          `http://localhost:4000/api/users/getUserById/${selectedBooking.userID}`
        );

        const userEmail = userResponse.data.email;
        await axios.put(
          `http://localhost:4000/api/booking/reject/${selectedBooking._id}`,
          { comment }
        );
        await axios.post("http://localhost:4000/api/sendEmail", {
          to: userEmail,
          subject: "Booking Rejected",
          heading: "Booking Rejected",

          content: `Your booking request has been rejected......
          Comment: ${comment}`,
        });
        alert("Rejected Email Sends to the User");

        fetchBookings();
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error rejecting booking", error);
      }
    }
  };

  return (
    <div>
      <TopNav />
      <h1 className="admin-dashboard-header">Booking Request Details</h1>
      <Table
        className="ant-table-container"
        dataSource={bookings}
        columns={columns}
        style={{ margin: "auto", width: "80%" }}
      />

      <Modal
        className="ant-modal-content custom-model"
        title="Booking Details  "
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="approve" onClick={handleApprove}>
            Approve
          </Button>,
          <Button key="reject" onClick={handleReject}>
            Reject
          </Button>,
        ]}
        style={{ margin: "auto" }}
      >
        {selectedBooking && (
          <>
            <hr></hr>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Booking ID:</strong>{" "}
              {selectedBooking._id}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Organization Name:</strong>{" "}
              {selectedBooking.organizationName}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">
                Organization Address:
              </strong>{" "}
              {selectedBooking.organizationAddress}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Selected Facility:</strong>{" "}
              {selectedBooking.facility}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Booking Date:</strong>{" "}
              {selectedBooking.bookingDate.map((date) => (
                <li className="date-List" key={date}>
                  {moment(date).format("YYYY-MM-DD")}
                </li>
              ))}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Booking Time:</strong>{" "}
              {timeOnly}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Designation:</strong>{" "}
              {selectedBooking.designation}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Description:</strong>{" "}
              {selectedBooking.description}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Status:</strong>{" "}
              {selectedBooking.status}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Permission Letter:</strong>{" "}
              {selectedBooking.permissionLetter ? (
                <button
                  style={{ color: "#8a1538c0" }}
                  onClick={() =>
                    window.open(
                      `http://localhost:4000/uploads/PermissionLetters/${selectedBooking.permissionLetter}`,
                      "_blank"
                    )
                  }
                >
                  View Permission Letter
                </button>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">NIC Image:</strong>{" "}
              {selectedBooking.userNICImg ? (
                <button
                  style={{ color: "#8a1538c0" }}
                  onClick={() =>
                    window.open(
                      `http://localhost:4000/uploads/NIC/${selectedBooking.userNICImg}`,
                      "_blank"
                    )
                  }
                >
                  View NIC Image
                </button>
              ) : (
                "Not Uploaded"
              )}
            </p>

            <Input.TextArea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </>
        )}
      </Modal>

      {selectedImage && (
        <Modal
          title="Image"
          visible={modalVisible}
          onCancel={() => setSelectedImage(null)}
          footer={null}
        >
          <img
            src={`http://localhost:4000/uploads/${selectedImage}`}
            alt="Uploaded"
            style={{ width: "50%" }}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookingApproval;
