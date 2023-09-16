const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },

    Artist: {
      type: String,
      required: [true, "Please add a Artist"],
    },
    Album: {
      type: String,
      required: [true, "Please add a Album"],
    },
    Genre: {
      type: String,
      required: [true, "Please add a Genre"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);
