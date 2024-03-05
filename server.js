const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const tableRoutes = require("./routes/tableRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://mje:mje@maincluster.vvkoqe0.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/tables", tableRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
