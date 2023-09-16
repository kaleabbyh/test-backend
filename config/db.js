const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MGDB;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
