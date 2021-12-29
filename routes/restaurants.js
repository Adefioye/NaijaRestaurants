const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateRestaurantSchema,
} = require("../middleware");

const {
  allRestaurants,
  renderNewRestaurantForm,
  showRestaurant,
  editRestaurantDetails,
  createNewRestaurant,
  updateRestaurantDetails,
  deleteRestaurant,
} = require("../controllers/restaurants");

const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

// Creating Campground routes

router.get("/", catchAsync(allRestaurants));

router.get("/page/:page", catchAsync(allRestaurants));

router.get("/new", isLoggedIn, renderNewRestaurantForm);

router.get("/:id", catchAsync(showRestaurant));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(editRestaurantDetails)
);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateRestaurantSchema,
  catchAsync(createNewRestaurant)
);

// router.post("/", upload.array("image"), (req, res) => {
//   console.log(req.files);
//   res.send("It worked");
// });

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  validateRestaurantSchema,
  catchAsync(updateRestaurantDetails)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteRestaurant));

module.exports = router;
