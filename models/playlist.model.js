const mongoose = require("mongoose");

const Playlistschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    playlistcode: { type: String, required: true },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    videos: [],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("playlistdatalist", Playlistschema);

module.exports = { Playlist };
