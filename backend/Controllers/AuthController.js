const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

/* const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({
          message: "User is already exist, you can login",
          success: false,
        });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
}; */


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Validation failed.",
        data: null,
        errors: {
          email: "This email is already registered.",
        },
      });
    }

    // Create a new user if email doesn't exist
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);

    // Save user in the database
    await userModel.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
      data: {
        id: userModel._id,
        name: userModel.name,
        email: userModel.email,
      },
      errors: null,
    });
  } catch (err) {
    console.error(err); // Log the error to server console for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: null,
    });
  }
};


/* const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed, email or password is incorrect";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate JWT Token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    // Set the user session
    req.session.userId = user._id;

    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}; */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Login failed, email or password is incorrect";

    if (!user) {
      return res.status(403).json({
        success: false,
        message: errorMsg,
        data: null,
        errors: null,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        success: false,
        message: errorMsg,
        data: null,
        errors: null,
      });
    }

    // Generate JWT Token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    // Response
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      errors: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: err.message,
    });
  }
};


// Implement logout function to destroy session
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", success: false });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully", success: true });
  });
};

module.exports = {
  signup,
  login,
  logout
};
