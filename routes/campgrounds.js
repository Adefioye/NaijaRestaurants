const express = require("express");
const router = express.Router();
const { campgroundSchema } = require("../Schema");
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/CatchAsync");

// Create validateSchema function for POST and PUT request for reusability
const validateCampgroundSchema = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    next(new ExpressError(message, 400));
  } else {
    next();
  }
};

// Creating Campground routes
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("reviews");
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);

router.post(
  "/",
  validateCampgroundSchema,
  catchAsync(async (req, res, next) => {
    // if (!req.body.campground)
    //   next(new ExpressError("Invalid Data Input for Campground", 400));

    const newCamp = await Campground(req.body.campground);
    await newCamp.save();
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

router.put(
  "/:id",
  validateCampgroundSchema,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground
    );
    res.redirect(`/campgrounds/${updatedCampground._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

module.exports = router;
