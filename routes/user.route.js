const express = require("express");
const {
  hashthispassword,
  checkifpasswordsmatch,
} = require("../functions/bcryptfunctions");
const { signwithjwt } = require("../functions/signwithjwt");
const { User } = require("../models/user.model");
const router = express.Router();
router.use(express.json());

router.route("/check").get(async (req, res) => {
  res.json({ success: true, message: "user route" });
});

router.route("/signup").post(async (req, res) => {
  try {
    const data = req.body;
    const username = data.username;
    const name = data.name;
    const hashedpassword = await hashthispassword(data.password);
    const checkifuserexist = await User.findOne({ username });
    if (checkifuserexist) {
      return res
        .status(400)
        .json({ success: false, message: "username already taken" });
    }
    const newuser = new User({
      name,
      username,
      password: hashedpassword,
    });
    await newuser.save();
    res.json({ success: true, message: "signup successfull" });
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const doesuserexist = await User.findOne({ username });
    if (doesuserexist === null) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exist" });
    }
    const passmatch = await checkifpasswordsmatch(
      password,
      doesuserexist.password
    );
    if (!passmatch) {
      return res
        .status(400)
        .json({ success: false, errormessage: "passwords don't match" });
    }
    if (passmatch) {
      const token = await signwithjwt(doesuserexist.username);
      return res.json({
        success: true,
        username: doesuserexist.username,
        userid: doesuserexist.userid,
        username,
        token,
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, errormessage: error.message });
  }
});

module.exports = router;
