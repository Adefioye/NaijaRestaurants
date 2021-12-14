const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

module.exports.allCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewCamproundForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  // console.log(campground);
  if (!campground) {
    req.flash("error", "Campground Not Found!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.editCampgroundDetails = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground Not Found!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

module.exports.createNewCampground = async (req, res, next) => {
  // if (!req.body.campground)
  //   next(new ExpressError("Invalid Data Input for Campground", 400));
  const newCamp = await Campground(req.body.campground);
  newCamp.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  newCamp.author = req.user._id;
  await newCamp.save();
  req.flash("success", "New Campground Successfully Created!");
  res.redirect(`/campgrounds/${newCamp._id}`);
};

module.exports.updateCampgroundDetails = async (req, res) => {
  const { id } = req.params;
  const updatedCampground = await Campground.findByIdAndUpdate(
    id,
    req.body.campground
  );
  console.log(updatedCampground);
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  // To delete images on database and cloudinary
  if (req.body.deleteImages) {
    for (let file of req.body.deleteImages) {
      await cloudinary.uploader.destroy(file);
    }
    await updatedCampground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  updatedCampground.images.push(...imgs);
  await updatedCampground.save();
  req.flash("success", "Campground Successfully Updated!");
  res.redirect(`/campgrounds/${updatedCampground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Campground Successfully Deleted!");
  res.redirect("/campgrounds");
};
