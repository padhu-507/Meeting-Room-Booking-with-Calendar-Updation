const express = require("express");

const { displayRooms, deleteId } = require("../controllers/cardController.js");

const router = express.Router();

router.route("/displayRooms").get(displayRooms);
router.route("/delete/:id").get(deleteId);

module.exports = router;
