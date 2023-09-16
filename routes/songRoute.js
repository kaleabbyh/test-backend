const express = require("express");
const router = express.Router();
const {
  addSong,
  getAllSongs,
  editSong,
  deleteSong,
} = require("../controllers/songController");

router
  .post("/addSong", addSong)
  .get("/getAllSongs", getAllSongs)
  .put("/editSong/:id", editSong)
  .delete("/deleteSong/:id", deleteSong);

module.exports = router;
