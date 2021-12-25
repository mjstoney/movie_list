const mongoose = require("mongoose");

const personnelSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
});

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  director: personnelSchema,
  year: {
    type: String,
    required: true,
  },
});

const Personnel = mongoose.model("Personnel", personnelSchema);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Personnel,
  Movie,
};
