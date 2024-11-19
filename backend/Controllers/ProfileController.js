const ProfileModel = require("../Models/Profile");
const UserModel = require("../Models/User");

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from JWT
    const profile = await ProfileModel.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
        data: null,
        errors: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        profile,
      },
      errors: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: {
        server: err.message,
      },
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from JWT
    const { name, email, contact, bio, profilePhoto } = req.body;

    // Find and update or create a new profile
    const profile = await ProfileModel.findOneAndUpdate(
      { userId },
      { name, email, contact, bio, profilePhoto, userId },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        profile,
      },
      errors: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
      errors: {
        server: err.message,
      },
    });
  }
};

module.exports = { getProfile, updateProfile };
