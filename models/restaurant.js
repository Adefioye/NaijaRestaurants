const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const imageSchema = new Schema({
  url: String,
  filename: String,
});

// To reduce the size of potentially deleted pics in the edit page
imageSchema.virtual("thumbnail").get(function (value, virtual, doc) {
  return this.url.replace("/upload", "/upload/w_150,h_100,c_fill");
});

const restaurantSchema = new Schema({
  title: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: String,
  images: [imageSchema],
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Always set up the POST middleware before instantiating the model class

restaurantSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
