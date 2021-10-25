// Import Express
const express = require("express");
const sampleData = require("../Sample_Data");
// Set Up Router
const router = express.Router();
// Import Data
const data = require("../Sample_Data");
// Import IDs (Demonstration Purposes)
const uuid = require("uuid");

// GET Base Route
router.get("/", (req, res) => {
  res.status(200).send("Sample Route Reached!");
});

// GET All Data
router.get("/alldata", (req, res) => {
  res.status(200).json(data);
  console.log(data);
});

// GET Specific Data
router.get("/:id", (req, res) => {
  try {
    res
      .status(200)
      .json(sampleData.filter((object) => object.id == req.params.id));
  } catch (err) {
    console.log(err);
  }
});

// POST (Create) Data
router.post("/", (req, res) => {
  try {
    const newData = {
      id: uuid.v4(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    };

    if (!newData.first_name || !newData.last_name || !newData.email) {
      res.status(400).json({ msg: "Please enter all fields" });
    } else {
      sampleData.push(newData);
      res.status(200).json(sampleData);
    }
  } catch (err) {
    console.log(err);
  }
});

// PUT (Update) Data
router.put("/:id", (req, res) => {
  try {
    const updateObject = req.body;
    sampleData.forEach((object) => {
      if (object.id == req.params.id) {
        object.first_name = updateObject.first_name
          ? updateObject.first_name
          : object.first_name;
        object.last_name = updateObject.last_name
          ? updateObject.last_name
          : object.last_name;
        object.email = updateObject.email ? updateObject.email : object.email;
      }
    });
    res.status(200).json(sampleData);
  } catch (err) {
    console.log(err);
  }
});

// DELETE Data
// NOTE: THIS IS NOT ACTUALLY DELETING FROM THE SAMPLE DATA FILE.
// IT IS FILTERING OUT FOR ALL THE DATA THAT DOES NOT HAVE THE SPECIFIED ID
// IT IS REALLY TO SHOW HOW TO SELECT THE DELETE ROUTE TO PERFORM A DELETE
// USING A DB WOULD MAKE MORE SENSE BECAUSE YOU WOULD RUN THAT DB'S COMMAND
// TO PHYSICALLY DELETE FROM THE DB.
router.delete("/:id", (req, res) => {
  try {
    res
      .status(200)
      .json(sampleData.filter((object) => object.id != req.params.id));
  } catch (err) {
    console.log(err);
  }
});

// Export Router
module.exports = router;
