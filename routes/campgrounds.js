const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampgroundSchema,
} = require("../middleware");

const {
  allCampgrounds,
  renderNewCamproundForm,
  showCampground,
  editCampgroundDetails,
  createNewCampground,
  updateCampgroundDetails,
  deleteCampground,
} = require("../controllers/campgrounds");

// Creating Campground routes
router.get("/", catchAsync(allCampgrounds));

router.get("/new", isLoggedIn, renderNewCamproundForm);

router.get("/:id", catchAsync(showCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(editCampgroundDetails)
);

router.post(
  "/",
  isLoggedIn,
  validateCampgroundSchema,
  catchAsync(createNewCampground)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampgroundSchema,
  catchAsync(updateCampgroundDetails)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;
