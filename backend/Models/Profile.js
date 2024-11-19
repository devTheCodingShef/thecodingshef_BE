
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String, // You can store the URL of the image
  },
});

const ProfileModel = mongoose.model("Profile", ProfileSchema);
module.exports = ProfileModel;
