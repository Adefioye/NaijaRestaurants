const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const catchAsync = require("../utils/CatchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampgroundSchema,
} = require("../middleware");

// Creating Campground routes
router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate("reviews")
      .populate("author");
    if (!campground) {
      req.flash("error", "Campground Not Found!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Campground Not Found!");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit", { campground });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampgroundSchema,
  catchAsync(async (req, res, next) => {
    // if (!req.body.campground)
    //   next(new ExpressError("Invalid Data Input for Campground", 400));

    const newCamp = await Campground(req.body.campground);
    newCamp.author = req.user._id;
    await newCamp.save();
    req.flash("success", "New Campground Successfully Created!");
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampgroundSchema,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground
    );
    req.flash("success", "Campground Successfully Updated!");
    res.redirect(`/campgrounds/${updatedCampground._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground Successfully Deleted!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
