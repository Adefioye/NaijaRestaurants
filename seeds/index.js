const mongoose = require("mongoose");
const Cities = require("./Cities1");
// const { descriptors, places } = require("./seedHelpers");
const Restaurant = require("../models/restaurant");
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

// const sample = (array) => array[Math.floor(Math.random() * array.length)];
// console.log(Cities.length);
// console.log(sample(Cities));

// const { city, state, latitude, longitude } = sample(Cities);
//     const descriptor = sample(descriptors);
//     const place = sample(places);
//     const price = Math.floor(Math.random() * 30) + 10;
//     const newCamp = new Campground({
//       author: "61b13325f855585c98cdff29",
//       location: `${city}, ${state}`,
//       title: `${descriptor} ${place}`,
//       image: "https://source.unsplash.com/collection/483251",
//       geometry: { type: "Point", coordinates: [longitude, latitude] },
//       description:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eius aliquam, nesciunt distinctio fuga necessitatibus adipisci voluptas maiores soluta quae nihil repudiandae, asperiores hic, optio sit quibusdam eum repellendus at.",
//       price,
//       images: [
//         {
//           url: "https://res.cloudinary.com/dq5fofxt9/image/upload/v1639428773/YelpCamp/df8zw8zj5p6hajrduhgs.jpg",
//           filename: "YelpCamp/df8zw8zj5p6hajrduhgs",
//         },
//         {
//           url: "https://res.cloudinary.com/dq5fofxt9/image/upload/v1639428775/YelpCamp/nfbi5maxf6vtzwpiig1s.jpg",
//           filename: "YelpCamp/nfbi5maxf6vtzwpiig1s",
//         },
//       ],
//     });

const seedDB = async () => {
  await Restaurant.deleteMany({});
  for (let city of Cities) {
    const { Name, Address, Description, latitude, longitude } = city;
    const restaurant = new Restaurant({
      author: "61b13325f855585c98cdff29",
      location: `${Address}`,
      title: `${Name}`,
      image: "https://source.unsplash.com/collection/483251",
      geometry: { type: "Point", coordinates: [longitude, latitude] },
      description: `${Description}`,
      images: [
        {
          url: "https://res.cloudinary.com/dq5fofxt9/image/upload/v1639428773/YelpCamp/df8zw8zj5p6hajrduhgs.jpg",
          filename: "YelpCamp/df8zw8zj5p6hajrduhgs",
        },
        {
          url: "https://res.cloudinary.com/dq5fofxt9/image/upload/v1639428775/YelpCamp/nfbi5maxf6vtzwpiig1s.jpg",
          filename: "YelpCamp/nfbi5maxf6vtzwpiig1s",
        },
      ],
    });

    await restaurant.save();
  }
};

// Delete and insert seed data into the database
seedDB().then(() => {
  mongoose.connection.close();
});
