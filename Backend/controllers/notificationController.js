const nodemailer = require("nodemailer");
//Real implementation
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'malithachamikara27@gmail.com',
    pass: 'squa dixe kxjm fgte',
  },
});
//Using mailtrap for testing
// const transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "fff1b55790b5a3",
//     pass: "1d7bde7b551218"
//   }
// });

// Sending email
const sendEmail = async (to, subject, heading, content) => {
  try {
    const mailOptions = {
      from: 'malithachamikara27@gmail.com', // sender address
      to: to, // list of receivers
      subject: subject,// Subject line
      html: `    
            <div className="container" 
            style="
            color:DodgerBlue;
            text-align:center;">
              <div className="heading">
                <h1>${heading}</h1>
              </div>
              <div className="content">
                ${content}
              </div>
             
            </div> ` // html body
    }
    // send mail with defined transport object
    const message = await transporter.sendMail(mailOptions);
    return { mailStatus: true }

  } catch (error) {
    return { mailStatus: false, error }
  }
}

module.exports = sendEmail;