const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../Schema");
const Campground = require("../models/campground");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/CatchAsync");

const validateReviewSchema = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    next(new ExpressError(message, 400));
  } else {
    next();
  }
};

// for posting reviews for each campground
router.post(
  "/",
  validateReviewSchema,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.reviews);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
