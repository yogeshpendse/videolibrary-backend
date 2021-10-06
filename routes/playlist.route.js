const express = require("express");
const { authhandler } = require("../middleware/authhandler");
const { Playlist } = require("../models/playlist.model");
const router = express.Router();
router.use(express.json());
router.use(authhandler);
router.route("/check").get(async (req, res) => {
  const uservalueid = req.uservalueid;
  res.json({
    success: true,
    message: "playlist route",
    uservalueid: uservalueid,
  });
});

router.route("/create").post(async (req, res) => {
  try {
    const uservalueid = req.uservalueid;
    const data = req.body;
    const playlistname = data.name;
    const playlistcode =
      uservalueid.toString() + "_" + JSON.stringify(data.plid);
    const playlistdoc = new Playlist({
      name: playlistname,
      playlistcode,
      userid: uservalueid,
    });
    await playlistdoc.save();
    res.json({
      success: true,
      message: "playlist created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, errormessage: error.message });
  }
});
router.route("/getallplaylist").get(async (req, res) => {
  try {
    const uservalueid = req.uservalueid;
    const userplaylists = await Playlist.find({ userid: uservalueid });
    res.json({ success: true, userplaylists });
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

module.exports = router;
