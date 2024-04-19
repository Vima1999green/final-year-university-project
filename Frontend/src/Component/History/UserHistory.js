import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import TopNav from "../TopNav/TopNav";
import axios from "axios";
import "./userHistory.css";
import moment from "moment";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";

const UserHistory = ({ bookingDate, Time }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("");

  const dateOnly = moment(bookingDate).format("YYYY-MM-DD");
  const timeOnly = moment(Time).format("HH:mm");

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, [userRole]);

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      console.log(data);

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
        setBookings(response.data); // Update the bookings state
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
      render: (text, record) => moment(text).format("YYYY-MM-DD"),
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

  return (
    <div>
      <TopNav />
      <h1 className="admin-dashboard-header">Booking Hisitory</h1>
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
        style={{ margin: "auto" }}
      >
        {selectedBooking && (
          <>
            <hr />
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
              {moment(selectedBooking.bookingDate).format("YYYY-MM-DD")}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">Booking Time:</strong>{" "}
              {moment(selectedBooking.Time).format("HH:mm")}
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

export default UserHistory;
