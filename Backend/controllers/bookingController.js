const multer = require('multer');
const path = require('path');
const Booking = require('../model/bookingModel');
const createMulterInstance = require('./createMulterInstance');
const checkFileType = require('../validation/facitityRouteValidation/checkPhotoType');
const checkLetterType = require('../validation/bookingRouteValidation/checkLetterType');
const isEmpty = require('../validation/isEmpty');
const validateBookingData = require('../validation/bookingRouteValidation/createBooking')
const sendEmail = require('./notificationController')
const validateUpdateBookingData = require('../validation/bookingRouteValidation/updateBooking');



//controller createBooking()
//description add booking to database
//developer Lahiru Srimal
const createBooking = async (req, res) => {

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
      //sending email to admin
      let mailStatus = false
      let mailError = {}
      try {
        const isEmailSend = sendEmail(
          'teamalpha869@gmail.com',
          'Sport Facility Reservation',
          `${req.body.facility} Reservation`,
          `A user had meke a booking reservation for ${req.body.facility}`)
      } catch (err) {
        mailStatus = false
        mailError = err
      }
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
      const bookingData = bookings.map(booking => ({
        _id: booking._id,
        date: booking.bookingDate,
        bookingStatus: booking.status,
        facilityID: booking.facilityId,
        facility: booking.facility
      }));
      res.send(bookingData);
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
    } else {
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
          const user = await User.findById(existingBooking.userID);
          if (!user) {
            return res.status(404).send('User not found');
          }

          //sending email to the user 
          try {
            await sendEmail(
              user.email,
              "Booking update notification",
              "Your booking dates has been updated",
              `<p>Your booking dates and times  are updated and new dates and times are
                  ${bookingData.bookingDate}and ${bookingData.Time}</P>`
            );
            console.log('Booking data updated and email sent to the user');

          } catch (error) {
            console.error('Error sending email ', error);
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
      if (!user) {
        return res.status(404).send('User not found');
      }

      try {
        await sendEmail(
          user.email,
          "Booking cancelation notification",
          "Your booking has been cancelled",
          `<p>Your booking has been cancelled</p>`
        );
        console.log('Succesfully send cancellation email');

      } catch (error) {
        console.error('Error sending email', error);
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

const uploadNIC = async (req, res) => {
  //check database for booking
  let bookingExist = false
  let userID = ""
  await Booking.findById(req.params.bookingID)
    .then(booking => {
      if (!isEmpty(booking)) {
        bookingExist = true
        userID = booking.userID
      }
    })
    .catch(err => {
      bookingExist = false
    })
  //autherization
  if (req.user.id !== userID.toString() && req.user.userType !== 'admin')
    return res.status(401).send('Unauthorized')
  const bookingID = req.params.bookingID
  if (bookingExist) {
    const uploadNICInstance = createMulterInstance(checkLetterType, 'NIC')
    if (!isEmpty(uploadNICInstance.single('nicPhoto'))) {
      const uploadNICData = uploadNICInstance.single('nicPhoto');
      uploadNICData(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).send('Multer error: ' + err);
        } else if (err) {
          return res.status(500).send('Internal server error: ' + err);
        }
        if (!req.file) {
          return res.status(400).send('No NIC file to upload');
        }
        const imgNIC = req.file.filename;
        const booking = Booking.findOneAndUpdate(
          { _id: bookingID },
          { userNICImg: imgNIC },
          { new: true }
        ).then(res => {
          console.log('Database updated')
        }).catch(error => {
          return res.status(500).send('Error updating Letter: ', error.response.data);
        })
        // Files were successfully uploaded
        console.log('Files uploaded');
        res.status(200).send('NIC uploaded');
        // next();
      });
    } else {
      res.status(200).send('No files to upload');
    }
  } else {
    return res.status(404).send('Booking not found')
  }
}

//controller uploadLetter()
//description upload letter to server
//developer Lahiru Srimal

const uploadLetter = async (req, res, next) => {
  //check database for booking
  let bookingExist = false
  let userID = ""
  await Booking.findById(req.params.bookingID)
    .then(booking => {
      if (!isEmpty(booking)) {
        bookingExist = true
        userID = booking.userID
      }
    })
    .catch(err => {
      bookingExist = false
    })
  //autherization
  if (req.user.id !== userID.toString() && req.user.userType !== 'admin')
    return res.status(401).send('Unauthorized')
  const bookingID = req.params.bookingID
  if (bookingExist) {
    const uploadLetterInstance = createMulterInstance(checkLetterType, 'PermissionLetters')
    if (!isEmpty(uploadLetterInstance.single('letter'))) {
      const uploadLetterData = uploadLetterInstance.single('letter');
      uploadLetterData(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).send('Multer error: ' + err);
        } else if (err) {
          return res.status(500).send('Internal server error: ' + err);
        }
        if (!req.file) {
          return res.status(400).send('No letter to upload');
        }
        const letter = req.file.filename;
        const booking = Booking.findOneAndUpdate(
          { _id: bookingID },
          { permissionLetter: letter },
          { new: true }
        ).then(res => {
          console.log('Database updated')
        }).catch(error => {
          return res.status(500).send('Error updating Letter: ', error.response.data);
        })
        // Files were successfully uploaded
        console.log('Files uploaded');
        res.status(200).send('Letter uploaded');
        // next();
      });
    } else {
      res.status(200).send('No files to upload');
    }
  } else {
    return res.status(404).send('Booking not found')
  }
}



module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  uploadNIC,
  uploadLetter
};
