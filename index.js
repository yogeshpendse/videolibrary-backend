const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 7000;
const dburi = process.env.URI;
const userroute = require("./routes/user.route");
const playlistroute = require("./routes/playlist.route");
const videoroute = require("./routes/video.route");

const { dbconnection } = require("./db/db.conn");
dbconnection(dburi);
app.get("/", (req, res) => {
  res.json({ success: true, message: "great success" });
});
app.use("/user", userroute);
app.use("/playlist", playlistroute);
app.use("/video", videoroute);

app.listen(port, () => {
  console.log(`Aloha app listening at http://localhost:${port}`);
});
