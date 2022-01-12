const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes.js");
const eventRoutes = require("./routes/event.routes.js");
const userRoutes = require("./routes/user.routes.js");
const reservationRoutes = require("./routes/reservation.routes.js");

const MONGODB_URI =
  "mongodb+srv://sandro:z6hE16hJP6wXx0zl@cluster0.zutnl.mongodb.net/OKPP-event-planner";

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reservation", reservationRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    confirmation: "fail",
    message: message,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
