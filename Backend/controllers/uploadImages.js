const multer=require('multer')
const checkFileType = require('../validation/facitityRouteValidation/checkFileType');
// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/"); // specify the destination folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // generate a unique filename
    },
  });
  
  // Create the Multer instance
  const uploadImages = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  })

  module.exports=uploadImages