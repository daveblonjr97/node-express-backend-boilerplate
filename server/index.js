// Import Express
const express = require("express");
// Import Specific Routes
const sampleRoute = require("./routes/sample_route");

// Establish Express App
const app = express();

// Establish PORT
const PORT = process.env.PORT || 3000;

// Establish Middleware
app.use(express.json());

// Establish Base Route For Specific Route/s
app.use("/api/sampleroute", sampleRoute);

// Establish Connection Between App and Specific Port
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
