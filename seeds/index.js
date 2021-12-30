const mongoose = require("mongoose");
const Cities = require("./Cities1");
const Restaurant = require("../models/restaurant");

// Set up database connection
async function main() {
  await mongoose.connect("mongodb://localhost:27017/naijaRestaurants");
}

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });

const seedDB = async () => {
  await Restaurant.deleteMany({});
  for (let city of Cities) {
    const { Name, Address, Description, latitude, longitude } = city;
    const restaurant = new Restaurant({
      author: "61cdc3feab2e0d4bd223ee9a",
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
