const WorkshopModel = require("../Models/Workshop");

// Create Workshop (Admin Only)
const createWorkshop = async (req, res) => {
  try {
    const { title, date, time, description, speaker, status } = req.body;

    const workshop = new WorkshopModel({
      title,
      date,
      time,
      description,
      speaker,
      status,
    });

    await workshop.save();
    res
      .status(201)
      .json({ success: true, message: "Workshop created", data: workshop });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", errors: err.message });
  }
};

// Get All Workshops (Accessible by All Authenticated Users)
const getWorkshops = async (req, res) => {
  try {
    const workshops = await WorkshopModel.find();
    res
      .status(200)
      .json({ success: true, message: "Workshops retrieved", data: workshops });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", errors: err.message });
  }
};

module.exports = { createWorkshop, getWorkshops };
