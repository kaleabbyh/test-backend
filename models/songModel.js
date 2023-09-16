const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },

    artist: {
      type: String,
      required: [true, "Please add a Artist"],
    },
    album: {
      type: String,
      required: [true, "Please add a Album"],
    },
    genre: {
      type: String,
      required: [true, "Please add a Genre"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Song", songSchema);
