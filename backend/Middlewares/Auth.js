const jwt = require("jsonwebtoken");

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  // Token should be passed as 'Bearer <token>'
  const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is invalid or expired" });
  }
};

// Middleware to check if the user has the required role
const authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res
      .status(403)
      .json({ message: "Forbidden: You do not have the required permissions" });
  }
  next(); // Allow the request to continue if the role matches
};

module.exports = { ensureAuthenticated, authorizeRole };
