const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const db = require("./controllers/mongo");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const { Personnel, Movie } = require("./models/movieModel");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.dbURI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

// TEST ROUTES
app.post("/addPersonnel", async (req, res) => {
  const { fname, lname } = req.body;
  const newPersonnel = new Personnel({
    fname,
    lname,
  });
  let result = await newPersonnel.save();
  res.send(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
