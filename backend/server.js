require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
