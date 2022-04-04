const express = require("express");
const {
  roomData,
  getCalendar,
} = require("../controllers/calendarController.js");

const router = express.Router();

router.route("/calendar").get(getCalendar).get(roomData);

module.exports = router;
