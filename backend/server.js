// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const MONGODB_URI = "mongodb://localhost:27017/Sample";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Sign Up Route
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error creating user" });
  }
});

// Sign In Route
app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Sign in successful", user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error signing in" });
  }
});

// Get User List Route
app.get("/users/get", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error fetching users" });
  }
});

// Update User Route
app.put("/users/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error updating user" });
  }
});

// Delete User Route
app.delete("/users/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error deleting user" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
