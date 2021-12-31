const Restaurant = require("./models/restaurant");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { restaurantSchema, reviewSchema } = require("./Schema");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must login in first");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/restaurants/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/restaurants/${id}`);
  }
  next();
};

// Create validateSchema function for POST and PUT request for reusability
module.exports.validateRestaurantSchema = (req, res, next) => {
  const { error } = restaurantSchema.validate(req.body);
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
