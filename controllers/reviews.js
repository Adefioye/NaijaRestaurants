const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  const review = new Review(req.body.reviews);
  review.author = req.user._id;
  restaurant.reviews.push(review);
  await review.save();
  await restaurant.save();
  req.flash("success", "New Review Successfully Created!");
  res.redirect(`/restaurants/${restaurant._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review successfully Deleted!");
  res.redirect(`/restaurants/${id}`);
};
