const mongoose = require("mongoose");

const miningSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    image: {
      type: String,
      required: [true, "Please add a image"],
    },
    type: {
      type: String,
      enum: [
        "coal",
        "lithium",
        "safarem",
        "opal",
        "emerald",
        "marble",
        "granite",
      ],
      required: [true, "Please add a type"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mining", miningSchema);
