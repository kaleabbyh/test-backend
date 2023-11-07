const express = require("express");
const router = express.Router();
const {
  addMining,
  getAllMinings,
  editMining,
  deleteMining,
} = require("../controllers/miningController");

router
  .post("/addmining", addMining)
  .get("/getAllminings", getAllMinings)
  .put("/editmining/:id", editMining)
  .delete("/deletemining/:id", deleteMining);

module.exports = router;
