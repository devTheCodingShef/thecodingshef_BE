const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("./User");
require("../Models/db");
require("dotenv").config(); // Load environment variables

const createUser = async (name, email, password) => {
  try {
    if (!name || !email || !password) {
      throw new Error("All parameters (name, email, password) are required.");
    }

    const normalizedEmail = email.toLowerCase();
    const adminEmail = process.env.ADMIN_EMAIL; // Get admin email from environment variables
    const role = normalizedEmail === adminEmail ? "admin" : "user";

    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("User with this email already exists! Updating role...");
      existingUser.role = role;
      await existingUser.save();
      console.log("User role updated successfully.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    console.log("Creating user with details:", newUser);

    await newUser.save();
    console.log(`User created with email: ${email}, role: ${role}`);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Call the function with valid arguments
createUser();
