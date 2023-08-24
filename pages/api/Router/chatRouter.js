const express = require("express");
const {
  getFirstTime,
  getSecondTimeAbove
} = require("../pages/api/Controller/chatController");

const router = express.Router();

router.post("/requestGPT1st", getFirstTime);

router.post("/requestGPT", getSecondTimeAbove);

module.exports = router;
