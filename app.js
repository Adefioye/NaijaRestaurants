const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Campground = require("./models/campground");

// Set up database connection
async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelpCamp");
}

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });

// setting up templating engine annd path to templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setting up routes to resources
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const newCamp = new Campground({
    title: "My Backyard",
    description: "Cheap camping",
  });
  await newCamp.save();
  res.send(newCamp);
});

app.listen(3000, () => {
  console.log("APP IS SERVED ON PORT 3000");
});
