// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // Include the user's role in the token
    },
    process.env.JWT_SECRET,
    { expiresIn: "48h" } // Set the token expiration time
  );
};

module.exports = { generateToken };
