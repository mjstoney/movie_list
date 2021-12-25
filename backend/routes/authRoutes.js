const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let result = await User.findOne({ username: username });
  if (result) {
    res.send("<h1>User exists</h1>");
  } else {
    const newUser = new User({
      username,
      email,
      password,
    });
    const result = await newUser.save();
    if (result) {
      res.send("<h1>Registration successful!</h1>");
    } else {
      res.send("<h1>Registration unsuccessful!</h1>");
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await User.findOne({ username });
  if (!result) {
    res.send("No such user.");
  }
  console.log(result);
  if (result.password == password) {
    req.session.authenticated = true;
    req.session.authorization = "user";
    res.send("Login success!");
  } else {
    res.send("Incorrect username and/or password.");
  }
});

router.get("/secret", isAuth, (req, res) => {
  res.send("Welcome to the secret page!");
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.status(200).send("Logged out.");
  });
});

module.exports = router;
