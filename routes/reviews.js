const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/CatchAsync");
const { validateReviewSchema } = require("../middleware");
const { isLoggedIn } = require("../middleware");

// for posting reviews for each campground
router.post(
  "/",
  isLoggedIn,
  validateReviewSchema,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.reviews);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "New Review Successfully Created!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Review successfully Deleted!");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
