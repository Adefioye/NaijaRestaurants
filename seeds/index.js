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
    const price = Math.floor(Math.random() * 30) + 10;
    const newCamp = new Campground({
      location: `${city}, ${state}`,
      title: `${descriptor} ${place}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eius aliquam, nesciunt distinctio fuga necessitatibus adipisci voluptas maiores soluta quae nihil repudiandae, asperiores hic, optio sit quibusdam eum repellendus at.",
      price,
    });
    await newCamp.save();
  }
};

// Delete and insert seed data into the database
seedDB().then(() => {
  mongoose.connection.close();
});
