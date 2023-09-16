const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");

// @desc    add new song
// @route   POST /api/song/addSong
// @access  Public
const addSong = asyncHandler(async (req, res) => {
  const { title, artist, Album, Genre } = req.body;
  if (!title || !artist || !Album || !Genre) {
    res.send("please add all fields");
  }
  const song = await Song.create(req.body);
  if (song) {
    res.status(201).json(song);
  } else {
    res.status(400);
    throw new Error("Invalid song data");
  }
});

// @desc    get all songs
// @route   POST /api/song/getAllSongs
// @access  Public
const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  if (songs) {
    res.status(201).json(songs);
  } else {
    res.status(400);
    throw new Error("no song data");
  }
});

// @desc   edit song
// @route   POST /api/song/editSong/:id
// @access  Public
const editSong = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updated = await Song.findByIdAndUpdate(id, req.body, { new: true });
  if (updated) {
    res.status(201).json(updated);
  } else {
    res.status(400);
    throw new Error("no song to update");
  }
});

// @desc    delete song
// @route   POST /api/song/deleteSong/:id
// @access  Public
const deleteSong = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Song.findByIdAndDelete(id);
  if (deleted) {
    res.status(201).send("song is deleted");
  } else {
    res.status(400);
    throw new Error("no song to delete");
  }
});

module.exports = {
  addSong,
  getAllSongs,
  editSong,
  deleteSong,
};
