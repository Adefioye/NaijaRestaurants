const Restaurant = require("../models/restaurant");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingCLient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

module.exports.allRestaurants = async (req, res) => {
  const restaurantsPerPage = 3;
  const page = req.params.page || 1;
  const numberOfRestaurantsSkipped = (page - 1) * restaurantsPerPage;
  const numberOfRestaurants = await Restaurant.countDocuments().exec();
  const restaurants = await Restaurant.find()
    .limit(restaurantsPerPage)
    .skip(numberOfRestaurantsSkipped)
    .exec();
  // const restaurants = await Restaurant.find({});
  const props = {
    restaurants: restaurants,
    currentPage: page,
    pages: Math.ceil(numberOfRestaurants / restaurantsPerPage),
  };
  res.render("restaurants/index", { ...props });
};

module.exports.renderNewRestaurantForm = (req, res) => {
  res.render("restaurants/new");
};

module.exports.showRestaurant = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  // console.log(Restaurant);
  if (!restaurant) {
    req.flash("error", "Restaurant Not Found!");
    return res.redirect("/restaurants");
  }
  res.render("restaurants/show", { restaurant });
};

module.exports.editRestaurantDetails = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    req.flash("error", "Restaurant Not Found!");
    return res.redirect("/restaurants");
  }
  res.render("restaurants/edit", { restaurant });
};

module.exports.createNewRestaurant = async (req, res, next) => {
  // if (!req.body.Restaurant)
  //   next(new ExpressError("Invalid Data Input for Restaurant", 400));

  const geoData = await geocodingCLient
    .forwardGeocode({
      query: req.body.restaurant.location,
      limit: 1,
    })
    .send();

  const restaurant = await Restaurant(req.body.restaurant);
  restaurant.geometry = geoData.body.features[0].geometry;
  restaurant.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  restaurant.author = req.user._id;
  await restaurant.save();
  req.flash("success", "New Restaurant Successfully Created!");
  res.redirect(`/restaurants/${restaurant._id}`);
};

module.exports.updateRestaurantDetails = async (req, res) => {
  const { id } = req.params;
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    id,
    req.body.restaurant
  );
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  // To delete images on database and cloudinary
  if (req.body.deleteImages) {
    for (let file of req.body.deleteImages) {
      await cloudinary.uploader.destroy(file);
    }
    await updatedRestaurant.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  updatedRestaurant.images.push(...imgs);
  await updatedRestaurant.save();
  req.flash("success", "Restaurant Successfully Updated!");
  res.redirect(`/restaurants/${updatedRestaurant._id}`);
};

module.exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  await Restaurant.findByIdAndDelete(id);
  req.flash("success", "Restaurant Successfully Deleted!");
  res.redirect("/restaurants");
};
