const {
  getProfile,
  updateProfile,
} = require("../Controllers/ProfileController");
const ensureAuthenticated = require("../Middlewares/Auth"); // Middleware to check if the user is authenticated

const router = require("express").Router();

router.get("/profile", ensureAuthenticated, getProfile); // Get user profile
router.put("/profile", ensureAuthenticated, updateProfile); // Update user profile

module.exports = router;
