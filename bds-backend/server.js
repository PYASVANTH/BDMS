
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// dotenv.config();

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// // User Schema and Model
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// // Register Route
// app.post("/api/users/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Name, email, and password are required" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully", success: true });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ error: "Failed to register user" });
//   }
// });

// // Login Route
// app.post("/api/users/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User does not exist", success: false });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     res.status(200).json({ message: "Login successful", success: true });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Failed to login" });
//   }
// });

// // Donation Requests Route
// const donationSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     bloodGroup: { type: String, required: true },
//     location: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Donation = mongoose.model("Donation", donationSchema);

// // Availability Schema and Model
// const availabilitySchema = new mongoose.Schema({
//   bloodType: { type: String, required: true, unique: true },
//   availableUnits: { type: Number, required: true, default: 0 },
//   location: { type: String, required: true },
// });

// const Availability = mongoose.model("Availability", availabilitySchema);

// // Donation Endpoint
// app.post("/api/donations", async (req, res) => {
//   console.log("Received Donation Data:", req.body);

//   const { name, bloodGroup, location } = req.body;

//   if (!name || !bloodGroup || !location) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Create a new Donation document
//     const newDonation = new Donation({
//       name,
//       bloodGroup,
//       location,
//     });

//     // Save the donation to the database
//     await newDonation.save();

//     // Update availability
//     const availability = await Availability.findOne({ bloodType: bloodGroup, location });
//     if (availability) {
//       availability.availableUnits += 1; // Increment available units
//       await availability.save();
//     } else {
//       const newAvailability = new Availability({
//         bloodType: bloodGroup,
//         availableUnits: 1,
//         location,
//       });
//       await newAvailability.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Donation request added successfully and availability updated",
//       donation: newDonation,
//     });
//   } catch (error) {
//     console.error("Error saving donation:", error.message);
//     res.status(500).json({ message: "Failed to save donation request" });
//   }
// });

// // Fetch Availability Route
// app.get("/api/availability", async (req, res) => {
//   try {
//     const availability = await Availability.find();
//     res.status(200).json({ success: true, availability });
//   } catch (error) {
//     console.error("Error fetching availability:", error.message);
//     res.status(500).json({ message: "Failed to fetch availability" });
//   }
// });

// // Recipient Requests Route
// const recipientSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     bloodGroup: { type: String, required: true },
//     location: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Recipient = mongoose.model("Recipient", recipientSchema);

// app.post("/api/recipient", async (req, res) => {
//   console.log("Received Recipient Data:", req.body);

//   const { name, bloodGroup, location } = req.body;

//   if (!name || !bloodGroup || !location) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Create a new Recipient document
//     const newRecipient = new Recipient({
//       name,
//       bloodGroup,
//       location,
//     });

//     // Save the recipient request to the database
//     await newRecipient.save();

//     res.status(201).json({
//       success: true,
//       message: "Recipient request added successfully",
//       recipient: newRecipient,
//     });
//   } catch (error) {
//     console.error("Error saving recipient request:", error.message);
//     res.status(500).json({ message: "Failed to save recipient request" });
//   }
// });

// // Start the Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });





const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// User Schema and Model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Register Route
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login Route
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Donation Requests Schema and Model
const donationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);

// Availability Schema and Model
const availabilitySchema = new mongoose.Schema({
  bloodType: { type: String, required: true, unique: true },
  availableUnits: { type: Number, required: true, default: 0 },
  location: { type: String, required: true },
});

const Availability = mongoose.model("Availability", availabilitySchema);

// Donation Endpoint
app.post("/api/donations", async (req, res) => {
  console.log("Received Donation Data:", req.body);

  const { name, bloodGroup, location } = req.body;

  if (!name || !bloodGroup || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new Donation document
    const newDonation = new Donation({
      name,
      bloodGroup,
      location,
    });

    // Save the donation to the database
    await newDonation.save();

    // Update availability
    const availability = await Availability.findOne({ bloodType: bloodGroup, location });
    if (availability) {
      availability.availableUnits += 1; // Increment available units
      await availability.save();
    } else {
      const newAvailability = new Availability({
        bloodType: bloodGroup,
        availableUnits: 1,
        location,
      });
      await newAvailability.save();
    }

    res.status(201).json({
      success: true,
      message: "Donation request added successfully and availability updated",
      donation: newDonation,
    });
  } catch (error) {
    console.error("Error saving donation:", error.message);
    res.status(500).json({ message: "Failed to save donation request" });
  }
});

// Fetch Availability Route
app.get("/api/availability", async (req, res) => {
  try {
    const availability = await Availability.find();
    res.status(200).json({ success: true, availability });
  } catch (error) {
    console.error("Error fetching availability:", error.message);
    res.status(500).json({ message: "Failed to fetch availability" });
  }
});

// Recipient Requests Schema and Model
const recipientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Recipient = mongoose.model("Recipient", recipientSchema);

// Recipient Endpoint (Updated)
app.post("/api/recipient", async (req, res) => {
  console.log("Received Recipient Data:", req.body);

  const { name, bloodGroup, location } = req.body;

  if (!name || !bloodGroup || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check availability
    const availability = await Availability.findOne({ bloodType: bloodGroup, location });

    if (!availability || availability.availableUnits <= 0) {
      return res.status(400).json({ message: "Requested blood type is not available at this location" });
    }

    // Create a new Recipient document
    const newRecipient = new Recipient({
      name,
      bloodGroup,
      location,
    });

    // Save the recipient request
    await newRecipient.save();

    // Update availability (decrement available units)
    availability.availableUnits -= 1;
    await availability.save();

    res.status(201).json({
      success: true,
      message: "Recipient request added successfully and availability updated",
      recipient: newRecipient,
    });
  } catch (error) {
    console.error("Error saving recipient request:", error.message);
    res.status(500).json({ message: "Failed to save recipient request" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
