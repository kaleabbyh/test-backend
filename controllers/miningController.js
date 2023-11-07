const asyncHandler = require("express-async-handler");
const Mining = require("../models/miningModel");

// @desc    add new Mining
// @route   POST /api/Mining/addMining
const addMining = asyncHandler(async (req, res) => {
  const { title, description, image, type } = req.body;
  if (!title || !description || !image || !type) {
    res.send("please add all fields");
  }
  const mining = await Mining.create(req.body);
  if (mining) {
    res.status(201).json(mining);
  } else {
    res.status(400);
    throw new Error("Invalid Mining data");
  }
});

// @desc    get all Minings
// @route   POST /api/Mining/getAllMinings

const getAllMinings = asyncHandler(async (req, res) => {
  const Minings = await Mining.find();
  if (Minings) {
    res.status(201).json(Minings);
  } else {
    res.status(400);
    throw new Error("no Mining data");
  }
});

// @desc   edit Mining
// @route   POST /api/Mining/editMining/:id
const editMining = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updated = await Mining.findByIdAndUpdate(id, req.body, { new: true });
  if (updated) {
    res.status(201).json(updated);
  } else {
    res.status(400);
    throw new Error("no Mining to update");
  }
});

// @desc    delete Mining
// @route   POST /api/Mining/deleteMining/:id
const deleteMining = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Mining.findByIdAndDelete(id);
  if (deleted) {
    res.status(201).send("Mining is deleted");
  } else {
    res.status(400);
    throw new Error("no Mining to delete");
  }
});

module.exports = {
  addMining,
  getAllMinings,
  editMining,
  deleteMining,
};
