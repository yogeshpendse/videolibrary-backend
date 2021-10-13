const mongoose = require("mongoose");

const Videoschema = new mongoose.Schema({
  videoid: { type: String },
  name: { type: String },
});

const Video = mongoose.model("Videodatalist", Videoschema);

module.exports = { Video };
