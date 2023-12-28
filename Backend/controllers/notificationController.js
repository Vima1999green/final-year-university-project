const nodemailer = require("nodemailer");
//Real implementation
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'lahiruprasangasrimal@gmail.com',
//         pass: 'ifjk iakk umqp ebwl',
//     },
// });
//Using mailtrap for testing
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "435dccc2f5f276",
        pass: "2c7ba0d7b320e3"
    }
});

// Sending email
const sendEmail = async (to, subject, heading, content) => {
    try {
        const mailOptions = {
            from: 'FacilityScheduler@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject,// Subject line
            html: `    
            <div className="container">
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
        return {mailStatus:true}

    } catch (error) {
        return {mailStatus:false,error}
    }
}

module.exports=sendEmail;
