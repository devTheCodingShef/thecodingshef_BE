const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const { generateToken } = require("../utils/generateToken"); // Token generation utility

// Signup function to register a new user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Validation failed.",
        data: null,
        errors: {
          email: "This email is already registered.",
        },
      });
    }

    // Hash the password and create a new user if email doesn't exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user in the database
    await newUser.save();

    // Send successful response
    res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      errors: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: err.message,
    });
  }
};

// Login function to authenticate the user and generate a JWT token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    const errorMsg = "Login failed, email or password is incorrect";

    // Check if user exists
    if (!user) {
      return res.status(403).json({
        success: false,
        message: errorMsg,
        data: null,
        errors: null,
      });
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: errorMsg,
        data: null,
        errors: null,
      });
    }

    // Generate JWT Token
    const token = generateToken(user); // Token creation from utils/generateToken.js

    // Respond with the JWT token and user data
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      errors: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: err.message,
    });
  }
};

// Logout function to destroy the user session
const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Logout failed", success: false });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res
        .status(200)
        .json({ message: "Logged out successfully", success: true });
    });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
