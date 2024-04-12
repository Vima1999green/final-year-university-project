import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import axios from "axios";
import "./BookingAproval.css";
import moment from "moment";

const BookingApproval = ({ bookingDate, Time }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");
  const dateOnly = moment(bookingDate).format("YYYY-MM-DD");
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
      render: (text, record) => dateOnly,
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
    // setSelectedBooking(mockBookingWithImages);
    setSelectedBooking(booking);
    setIsModalVisible(true); // Open the modal
  };

  const handleApprove = () => {
    // approve logic
  };

  const handleReject = () => {
    // reject logic
  };

  return (
    <div>
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
              {dateOnly}
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
                <a
                  href={`http://localhost:4000/uploads/PermissionLetters/${selectedBooking.permissionLetter}`}
                  onClick={() =>
                    setSelectedImage(selectedBooking.permissionLetter)
                  }
                >
                  View Permission Letter
                </a>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <p className="model-pharagraph">
              <strong className="model-pharagraph">NIC Image:</strong>{" "}
              {selectedBooking.userNICImg ? (
                <a
                  href={`http://localhost:4000/uploads/NIC/${selectedBooking.userNICImg}`}
                >
                  View NIC Image
                </a>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <Input.TextArea
              className="add-comment"
              placeholder="Add a comment"
              value={comment}
              autoSize={{ minRows: 2, maxRows: 8 }}
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
            style={{ width: "100%" }}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookingApproval;
