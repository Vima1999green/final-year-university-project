const express = require("express");
const router = express.Router();
const { sendEmail } = require("../../controllers/notificationController");

// Route to send an email
router.post("/sendEmail", (req, res) => {
  const { to, subject, heading, content } = req.body;

  sendEmail(to, subject, heading, content)
    .then(() => res.send("Email sent successfully"))
    .catch((error) => {
      console.error("Failed to send email:", error);
      res.status(500).send("Failed to send email");
    });
});

module.exports = router;
