const multer = require('multer')
// Set up storage for Multer

// Create the Multer instance
const createMulterInstance = (checkFileType, filepath) => {
    const fullFilePath = './uploads/' + filepath;
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullFilePath); // specify the destination folder
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname); // generate a unique filename
        },
    });
    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        },
    });
};

module.exports = createMulterInstance