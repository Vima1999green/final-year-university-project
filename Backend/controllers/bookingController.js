const multer = require('multer');
const path = require('path');
const Booking = require('../model/bookingModel');
const createMulterInstance = require('./createMulterInstance');
const checkFileType = require('../validation/facitityRouteValidation/checkPhotoType');
const isEmpty = require('../validation/isEmpty');
const validateBookingData=require('../validation/bookingRouteValidation/createBooking')


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
      res.send(bookings)
    })

    .catch((error) => {
      res.status(400).send(error)
    })
}

//controller updateBooking()
//description update a booking in the database
//developer Malitha Chamikara

const updateBooking = async (req, res) => {
  if (req.user.userType === 'admin') {
    let bookingData = req.body
    bookingData.id = req.params.id

    try {
      const booking = await Booking.findByIdAndUpdate(bookingData.id,
        { bookingDate: bookingData.bookingDate, Time: bookingData.Time, status: bookingData.status },
        { new: true }
      )

      if (booking) {
        console.log('booking data updated');
        return res.send(booking)

      }

    } catch (error) {
      console.error('Error updating booking data', error);
      return res.status(500).send('Error updating or finding booking data');
    }



  } else {
    res.status(401).send('you are not authorized to update booking data')
  }
}

//controller deleteBooking()
//description delete a booking from the database
//developer Malitha Chamikara
const deleteBooking = async (req, res) => {
  if (req.user.userType === 'admin') {
    let bookingData = req.body
    bookingData.id = req.params.id

    try {
      if (bookingData.status === 'cancelled' || bookingData.deleteRequested === true) {
        await Booking.findByIdAndDelete(bookingData.id);
        console.log('Booking deleted');
        return res.send('Booking deleted')
      }


    } catch (error) {
      console.error('Error deleteing or finding booking data', error);
      return res.status(500).send('Error deleting or finding booking data');

    }

  } else {
    res.status(401).send('You are not authorized to delete this booking')
  }
}

//controller uploadNic()
//description upload NIC of the user to the database
//developer Malitha Chamikara

const uploadNic = async (req, res) => {
  const { bookingId } = req.params;
  const uploadNic = createMulterInstance(checkFileType, 'Nic photos');
  const uploadNicData = uploadNic.single('nicPhoto');

  if (!isEmpty(uploadNicData)) {
    uploadNicData(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send('Multer err' + err);

      } else if (err) {
        return res.status(500).send('Internal server error' + err);
      }

      const nic = req.file.path;
      const booking = Booking.findByIdAndDelete(
        bookingId,
        { userNic: nic },
        { new: true }
      )

        .then((booking) => {
          console.log('Nic uploaded and booking updated');
          return res.send(booking)
        })

        .catch(error => {
          return res.status(500).send('Error updating booking', error.response.data);
        })

      console.log('Files uploaded');
      res.status(200).send('Files uploaded');

    });
  } else {
    res.status(200).send('No files to upload');
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  uploadNic
};
