// routes/ProfileRouter.js
const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../Controllers/ProfileController");
const { ensureAuthenticated } = require("../Middlewares/Auth");

// Get profile (accessible to authenticated users)
router.get("/profile", ensureAuthenticated, getProfile);

// Update profile (accessible to authenticated users)
router.put("/profile", ensureAuthenticated, updateProfile);

module.exports = router;
