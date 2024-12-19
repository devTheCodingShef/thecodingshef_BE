const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
  speaker: { type: String },
  status: {
    type: String,
    enum: ["Upcoming", "Completed", "Expired"],
    default: "Upcoming",
  },
});

const WorkshopModel = mongoose.model("Workshop", WorkshopSchema);
module.exports = WorkshopModel;
