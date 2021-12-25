const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/:username", async (req, res) => {
  let { username } = req.params;
  console.log(username);
  let result = await User.findOne({ username });
  res.send(result);
});

module.exports = router;
