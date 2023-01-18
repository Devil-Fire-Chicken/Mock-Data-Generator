const express = require("express");
const router = express.Router();
const dbController = require("../controllers/dbController");

// dbController is an array of all of our controller functions, NOT an object with controller methods

router.get("/", dbController, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
