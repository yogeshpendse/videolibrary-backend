const express = require("express");
const mongoose = require("mongoose");
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
      playlistcode,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, errormessage: error.message });
  }
});
router.route("/delete").post(async (req, res) => {
  try {
    const { playlistid } = req.body;
    const playlistdata = await Playlist.findOne({ playlistcode: playlistid });
    if (playlistdata) {
      await Playlist.findByIdAndDelete(playlistdata._id);
      return res.json({
        success: true,
        message: "Playlist deleted successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Playlist doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, errormessage: error.message });
  }
});
router.route("/getallplaylist").get(async (req, res) => {
  try {
    const uservalueid = req.uservalueid;
    const userplaylists = await Playlist.find({ userid: uservalueid }).sort({
      createdAt: "descending",
    });
    res.json({ success: true, userplaylists });
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});
router.route("/addtoplaylist").post(async (req, res) => {
  try {
    const { videouid, playlistid } = req.body;
    const currentplaylist = await Playlist.findOne({
      playlistcode: playlistid,
    });
    const playlistarray = currentplaylist.videos.map((x) => x.toString());
    const includes = playlistarray.some((x) => x === videouid);
    if (includes) {
      return res.status(400).json({
        success: false,
        message: "video is already present in playlist",
      });
    }
    if (!includes) {
      const newplaylistarray = [...playlistarray, videouid];
      const objectifiednewplaylistarray = newplaylistarray.map((x) =>
        mongoose.Types.ObjectId(x)
      );
      await Playlist.findByIdAndUpdate(currentplaylist._id, {
        videos: objectifiednewplaylistarray,
      });
      return res.json({
        success: true,
        message: "video added to playlist",
        videouid,
        playlistid,
        videos: objectifiednewplaylistarray,
      });
    }
    res.json({
      success: true,
      videouid,
      playlistid,
      currentplaylist,
      includes,
    });
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

router.route("/deletefromplaylist").post(async (req, res) => {
  try {
    const { videouid, playlistid } = req.body;
    const currentplaylist = await Playlist.findOne({
      playlistcode: playlistid,
    });
    const playlistarray = currentplaylist.videos.map((x) => x.toString());
    const includes = playlistarray.some((x) => x === videouid);
    if (!includes) {
      return res
        .status(400)
        .json({ success: false, message: "No such video in this playlist" });
    }
    if (includes) {
      const newplaylistarray = playlistarray.filter((x) => x !== videouid);
      const objectifiednewplaylistarray = newplaylistarray.map((x) =>
        mongoose.Types.ObjectId(x)
      );
      await Playlist.findByIdAndUpdate(currentplaylist._id, {
        videos: objectifiednewplaylistarray,
      });
      return res.json({
        success: true,
        message: "video deleted from playlist",
        videouid,
        playlistid,
        videos: objectifiednewplaylistarray,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

module.exports = router;
