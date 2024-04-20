import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Upload, message } from "antd";
import TopNav from "../TopNav/TopNav";
import axios from "axios";
import "./userHistory.css";
import moment from "moment";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";

const UserHistory = ({ bookingDate = [], Time }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [showPaymentSlipUploader, setShowPaymentSlipUploader] = useState(false);

  const timeOnly = moment(Time).format("HH:mm");

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, [userRole]);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      if (isEmpty(data) || data === "Unauthorized") {
        navigate("/login");
      } else {
        setUserData(data);
        setUserID(data.id);
        setUserRole(data.userType);
        fetchBookings(data.userType);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const fetchBookings = async (userType) => {
    try {
      let response;
      if (
        userType === "admin" ||
        userType === "director" ||
        userType === "dvc"
      ) {
        response = await axios.get(
          "http://localhost:4000/api/booking/getAllBookings"
        );
      } else if (userType === "Guest") {
        response = await axios.get(
          `http://localhost:4000/api/booking/getBooking/${userID}`
        );
      }

      if (response && response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("Error fetching booking data", error);
    }
  };

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      key: "organizationName",
    },
    {
      title: "Organization Address",
      dataIndex: "organizationAddress",
      key: "organizationAddress",
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
    setModalVisible(true);

    if (booking.status === "approved") {
      setApprovalStatus("approved");
      setShowPaymentSlipUploader(true);
    } else {
      setApprovalStatus("");
      setShowPaymentSlipUploader(false);
    }
  };

  const handlePaymentSlipUpload = async (paymentSlip) => {
    try {
      const formData = new FormData();
      formData.append("PaymentSlip", paymentSlip.file);

      await axios.post(
        `http://localhost:4000/api/booking/paymentSlip/${selectedBooking._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Payment slip uploaded successfully");

      // Fetch updated booking details to get the new PaymentSlip information
      await fetchBookings(userRole);

      // Update selectedBooking with the new PaymentSlip information
      const updatedSelectedBooking = bookings.find(
        (booking) => booking._id === selectedBooking._id
      );
      setSelectedBooking(updatedSelectedBooking);

      // Close and reopen the modal to force re-render
      setIsModalVisible(false);
      setTimeout(() => setIsModalVisible(true), 0); // Re-open the modal in the next event loop
    } catch (error) {
      console.error("Error uploading payment slip", error);
      alert("Error uploading payment slip");
    }
  };

  return (
    <div>
      <TopNav />
      <h1 className="admin-dashboard-header">Booking History</h1>
      <Table
        className="ant-table-container"
        dataSource={bookings}
        columns={columns}
        style={{ margin: "auto", width: "80%" }}
      />

      <Modal
        className="ant-modal-content custom-model"
        title="Booking Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Hides the default footer buttons
        style={{ margin: "auto" }}
      >
        {selectedBooking && (
          <>
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
              <strong className="model-pharagraph">NIC:</strong>{" "}
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
                  View NIC image
                </button>
              ) : (
                "Not Uploaded"
              )}
            </p>

            <p className="model-pharagraph">
              <strong className="model-pharagraph">Permission Letter:</strong>{" "}
              {selectedBooking.permissionLetter ? (
                <button
                  style={{ color: "#8a1538c0" }}
                  onClick={() =>
                    window.open(
                      `http://localhost:4000/uploads//${selectedBooking.permissionLetter}`,
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
              <strong className="model-pharagraph">Payment Slip:</strong>{" "}
              {selectedBooking.PaymentSlip ? (
                <button
                  style={{ color: "#8a1538c0" }}
                  onClick={() =>
                    window.open(
                      `http://localhost:4000/uploads/PaymentSlips/${selectedBooking.PaymentSlip}`,
                      "_blank"
                    )
                  }
                >
                  View Payment Slip
                </button>
              ) : (
                "Not Uploaded yet"
              )}
            </p>
            {/* Other details of the selected booking */}
            {approvalStatus === "approved" &&
              userRole === "Guest" &&
              showPaymentSlipUploader && (
                <div>
                  <Upload
                    beforeUpload={() => false}
                    onChange={handlePaymentSlipUpload}
                    maxCount={1}
                    accept=".pdf.jpg,.jpeg,.png"
                  >
                    <Button>Upload Payment Slip</Button>
                  </Upload>
                </div>
              )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserHistory;
