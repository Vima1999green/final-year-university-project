const multer = require("multer");
const path = require("path");
const Booking = require("../model/bookingModel");
const User  = require('../model/userModel');
const createMulterInstance = require("./createMulterInstance");
const checkFileType = require("../validation/facitityRouteValidation/checkPhotoType");
const isEmpty = require("../validation/isEmpty");
const validateBookingData=require('../validation/bookingRouteValidation/createBooking')
const validateUpdateBookingData = require('../validation/bookingRouteValidation/updateBooking');
const sendEmail = require('./notificationController');


//controller createBooking()
//description add booking to database
//developer Lahiru Srimal
const createBooking=async(req,res)=>{

    // Validate booking data
    const { errors, isValid } = await validateBookingData(req.body);
    if (!isValid) {
      var errorMsg = "";
      Object.values(errors).forEach((error) => {
        errorMsg += error + "\r\n";
      });
      errorMsg = errorMsg.trim();
      return res.status(400).send(errorMsg);
    }
  //create booking in the database
  await Booking.create(req.body)
    .then((newBooking) => {
      res.send(newBooking);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

//controller getAllBookings()
//description get all bookings from database
//developer Malitha Chamikara

const getAllBookings = async (req, res) => {
  await Booking.find()
    .then((bookings) => {
      res.send(bookings);
    })

    .catch((error) => {
      res.status(400).send(error);
    });
};

//controller updateBooking()
//description update a booking in the database
//developer Malitha Chamikara

const updateBooking = async (req, res) => {
  if (req.user.userType === "admin") {
    let bookingData = req.body;
    bookingData.id = req.params.bookingID;
    const { errors, isValid } = await validateUpdateBookingData(bookingData);
    if (!isValid) {
      var errorMsg = ''
      Object.values(errors).forEach(error => {
        errorMsg += error + '\r\n'
      })
      errorMsg = errorMsg.trim()
      res.status(400).send(errorMsg);
    }else
    {
      try {
        const existingBooking = await Booking.findById(bookingData.id);
        if (!existingBooking) {
          return res.status(404).send("Booking not found");
        }
  
        if (
         
          bookingData.postponeRequested === true
        ) {
          const booking = await Booking.findByIdAndUpdate(
            bookingData.id,
            {
              bookingDate: bookingData.bookingDate,
              Time: bookingData.Time,
              status: bookingData.status,
            },
            { new: true }
          );
  
          if (booking) {
            console.log("booking data updated");
            return res.send(booking);
          }

          //fetch user email from userId 
          const user  = await User.findById(existingBooking.userID);
          if(!user){
            return res.status(404).send('User not found');
          }

          //sending email to the user 
          try{
            await sendEmail(
              user.email,
              "Booking update notification",
              "Your booking dates has been updated",
              `<p>Your booking dates and times  are updated and new dates and times are
                  ${bookingData.bookingDate}and ${bookingData.Time}</P>`
            );
            console.log('Booking data updated and email sent to the user');

          }catch(error){
              console.error('Error sending email ',error);
              return res.status(500).send('Error sending email ');
          }
        }
      } catch (error) {
        console.error("Error updating booking data", error);
        return res.status(500).send("Error updating  data");
      }
    }

    
  } else {
    res.status(401).send("you are not authorized to update booking data");
  }
};

//controller deleteBooking()
//description delete a booking from the database
//developer Malitha Chamikara
const deleteBooking = async (req, res) => {
  if (req.user.userType === "admin") {
    let bookingData = req.body;
    bookingData.id = req.params.id;

    try {
      if (
        bookingData.status === "cancelled" ||
        bookingData.deleteRequested === true
      ) {
        await Booking.findByIdAndDelete(bookingData.id);
        console.log("Booking deleted");
        return res.send("Booking deleted");

       

        }
        const user = User.findById(bookingData.userID);
        if(!user)
        {
          return res.status(404).send('User not found');
        }

        try{
          await sendEmail(
            user.email,
            "Booking cancelation notification",
            "Your booking has been cancelled",
            `<p>Your booking has been cancelled</p>`
          );
          console.log('Succesfully send cancellation email');

        }catch(error){
          console.error('Error sending email',error);
          return res.status(500).send('Error sending email');

        }
        
    } catch (error) {
      console.error("Error deleteing or finding booking data", error);
      return res.status(500).send("Error deleting or finding booking data");
    }
  } else {
    res.status(401).send("You are not authorized to delete this booking");
  }
};

//controller uploadNic()
//description upload NIC of the user to the database
//developer Malitha Chamikara

const uploadNic = async (req, res) => {
  const { bookingId } = req.params;
  const uploadNic = createMulterInstance(checkFileType, "Nic photos");
  const uploadNicData = uploadNic.single("nicPhoto");

  if (!isEmpty(uploadNicData)) {
    uploadNicData(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send("Multer err" + err);
      } else if (err) {
        return res.status(500).send("Internal server error" + err);
      }

      const nic = req.file.path;
      Booking.findByIdAndDelete(bookingId, { userNic: nic }, { new: true })

        .then((booking) => {
          console.log("Nic uploaded and booking updated");
          return res.send(booking);
        })

        .catch((error) => {
          return res
            .status(500)
            .send("Error updating booking", error.response.data);
        });

      console.log("Files uploaded");
      res.status(200).send("Files uploaded");
    });
  } else {
    res.status(200).send("No files to upload");
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  uploadNic,
};
