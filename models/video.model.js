const mongoose = require("mongoose");

const Videoschema = new mongoose.Schema(
  {
    videocode: { type: String },
    name: { type: String },
    thumbnail: { type: String },
    time: { type: Number },
    name: { type: String },
    description: { type: String },
    stars: { type: Number },
    type: { type: String },
    prime: { type: Boolean },
    date: { type: String },
    datenos: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Videodatalist", Videoschema);

module.exports = { Video };
