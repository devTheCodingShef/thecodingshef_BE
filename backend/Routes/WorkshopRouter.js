// routes/WorkshopRouter.js
const express = require("express");
const router = express.Router();
const {
  createWorkshop,
  getWorkshops,
} = require("../Controllers/WorkshopController");
const { ensureAuthenticated, authorizeRole } = require("../Middlewares/Auth");

// Create workshop (only accessible by admin)
router.post(
  "/workshops",
  ensureAuthenticated,
  authorizeRole("admin"),
  createWorkshop
);

// Get workshops (accessible by all authenticated users)
router.get("/workshops", ensureAuthenticated, getWorkshops);

module.exports = router;
