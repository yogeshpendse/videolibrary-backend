const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");

router.use(express.json());
router.route("/check").get(async (req, res) => {
  res.json({
    success: true,
    message: "video route",
  });
});

router.route("/getallvideos").get(async (req, res) => {
  try {
    const videodata = await Video.find();
    res.json({ success: true, data: videodata });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
