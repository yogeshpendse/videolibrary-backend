const express = require("express");
const { Playlist } = require("../models/playlist.model");
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
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

router.route("/thisvideo/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Video.findById(id);

    res.json({ success: true, videodata: data });
  } catch (error) {}
});

router.route("/:playlistid").get(async (req, res) => {
  try {
    const { playlistid } = req.params;
    const userid = playlistid.split("_")[0];
    const playlistdata = await Playlist.findOne({ playlistcode: playlistid });
    const videosarray = playlistdata.videos.map((x) => x.toString());
    const newvideosarray = [...videosarray];
    const videosdata = await Video.find()
      .where("_id")
      .in(newvideosarray)
      .exec();
    res.json({
      success: true,
      message: "video route",
      playlistcreator: userid,
      playlistid,
      videosdata,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

module.exports = router;
