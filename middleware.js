const Campground = require("./models/campground");
const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./Schema");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must login in first");
    res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${campground.id}`);
  }
  next();
};

// Create validateSchema function for POST and PUT request for reusability
module.exports.validateCampgroundSchema = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    next(new ExpressError(message, 400));
  } else {
    next();
  }
};

module.exports.validateReviewSchema = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    next(new ExpressError(message, 400));
  } else {
    next();
  }
};
