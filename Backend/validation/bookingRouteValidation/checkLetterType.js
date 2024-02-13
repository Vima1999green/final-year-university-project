const path = require('path')
//Validate Images (START)
const checkLetterType = (file, cb) => {
    // Allowed extensions
    const filetypes = /pdf|jpg|jpeg|png/;
    // Check the extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the MIME type (media player or content type)
    const mimetype = filetypes.test(file.mimetype);
    // Return an error if the file type is not allowed
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: PDF Only!");
    }
}
//Validate Images (END)

module.exports=checkLetterType