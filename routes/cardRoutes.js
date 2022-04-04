const express = require("express");

const {
  displayRooms
} = require("../controllers/cardController.js");

const router = express.Router();

router.route("/displayRooms").get(displayRooms);

module.exports = router;
