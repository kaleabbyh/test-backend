const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to song API");
});
app.use("/api/song", require("../routes/songRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`app running on port ${PORT}`);
});
