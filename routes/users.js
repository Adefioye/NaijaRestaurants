const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/CatchAsync");
const {
  renderRegistrationForm,
  registerUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/users");

router.get("/register", renderRegistrationForm);

router.post("/register", catchAsync(registerUser));

router.get("/login", renderLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginUser
);

router.get("/logout", logoutUser);

module.exports = router;
