const express = require("express");
const router = express.Router();
const { Personnel, Movie } = require("../models/movieModel");

router.post("/addMovie", async (req, res) => {
  let { fname, lname, title, year } = req.body;
  let newPersonnel = new Personnel({
    fname,
    lname,
  });
  let newMovie = new Movie({
    title,
    director: newPersonnel,
    year,
  });
  let result = await newMovie.save();
  console.log(result);
  res.send(result);
});

module.exports = router;
