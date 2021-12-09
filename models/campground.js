const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Always set up the POST middleware before instantiating the model class

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
