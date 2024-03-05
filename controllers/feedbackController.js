const nodemailer = require("nodemailer");
const Feedback = require("../models/Feedback");

async function submitFeedback(req, res) {
  try {
    const { name, email, rating, question1, question2, question3, comment } =
      req.body;
    const newFeedback = new Feedback({
      name,
      email,
      rating,
      question1,
      question2,
      question3,
      comment,
    });
    await newFeedback.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ala.messaoud12@gmail.com",
        pass: "eooo rkpm irtb igsy",
      },
    });

    const mailOptions = {
      from: "Your Feedback App <ala.messaoud12@gmail.com>",
      to: "attiayasmina01@gmail.com", // Your email address
      subject: "New Feedback Submitted",
      text: `Feedback data: ${JSON.stringify(req.body)}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Feedback saved successfully",
      savedDate: newFeedback.savedDate,
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getFeedback(req, res) {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).json(allFeedback);
  } catch (error) {
    console.error("Error getting feedback:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { submitFeedback, getFeedback };
