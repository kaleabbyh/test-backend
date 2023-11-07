const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MGDB_URI = process.env.MGDB_URI;
    await mongoose.connect(MGDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("successfully connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
