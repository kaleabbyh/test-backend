const mongoose = require("mongoose");
const dockerConnect = "mongodb://mongo:27017/test";

const connectDB = async () => {
  try {
    const uri = process.env.MGDB;
    await mongoose.connect(uri, {
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
