const mongoose = require("mongoose");
const movieModel = require("./movieModel");

const movieListSchema = mongoose.Schema({
  movieList: [movieModel],
});

const MovieList = mongoose.model("MovieList", movieListSchema);
module.exports = MovieList;
