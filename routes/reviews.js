const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/CatchAsync");
const { validateReviewSchema } = require("../middleware");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const { createReview, deleteReview } = require("../controllers/reviews");

// for posting reviews for each campground
router.post("/", isLoggedIn, validateReviewSchema, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
