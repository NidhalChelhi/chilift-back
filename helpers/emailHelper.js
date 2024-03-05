const nodemailer = require("nodemailer");

async function sendEmail(userEmail, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Your New Password",
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { sendEmail };
