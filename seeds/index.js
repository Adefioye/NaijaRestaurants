const mongoose = require("mongoose");
const Cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");
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

const sample = (array) => array[Math.floor(Math.random() * array.length)];
// console.log(Cities.length);
// console.log(sample(Cities));

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const { city, state } = sample(Cities);
    const descriptor = sample(descriptors);
    const place = sample(places);
    const newCamp = new Campground({
      location: `${city}, ${state}`,
      title: `${descriptor} ${place}`,
    });
    await newCamp.save();
  }
};

// Delete and insert seed data into the database
seedDB().then(() => {
  mongoose.connection.close();
});
