const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
const upload = multer({ dest: __dirname + "/public/images/activities" });

app.listen(3000, () => {
  console.log("Listening");
});

/*mongoose
  .connect("mongodb://localhost/activities")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB", error);
  });*/

mongoose
  .connect(
    "mongodb+srv://ryanmalone192:y3UkPcTvEWhvhBPC@delawareactivities.ixrhick.mongodb.net/Activities?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB", error);
  });

const activitySchema = new mongoose.Schema({
  nameOfLocation: String,
  typeOfLocation: String,
  longitude: Number,
  latitude: Number,
  address: String,
  phone: String,
  email: String,
  hoursOpen: String,
  hoursClose: String,
  googleReview: String,
  longDescription: String,
  shortDescription: String,
  att: String,
  img: String,
});

const Activity = mongoose.model("activity", activitySchema);

const attractionSchema = new mongoose.Schema({
  nameOfLocation: String,
  typeOfLocation: String,
  longitude: Number,
  latitude: Number,
  address: String,
  phone: String,
  email: String,
  hoursOpen: String,
  hoursClose: String,
  googleReview: String,
  longDescription: String,
  shortDescription: String,
  att: String,
  img: String,
});

const Attraction = mongoose.model("attraction", attractionSchema);

// Navigation
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/discover", (req, res) => {
  res.sendFile(__dirname + "/discover.html");
});

app.get("/activities", (req, res) => {
  res.sendFile(__dirname + "/activities.html");
});

app.get("/pictures", (req, res) => {
  res.sendFile(__dirname + "/pictures.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

// Database Management
app.get("/api/activities", async (req, res) => {
  getActivities(res);
});

const getActivities = async (res) => {
  const activities = await Activity.find();
  res.send(activities);
};

app.get("/api/attractions", async (req, res) => {
  getAttractions(res);
});

const getAttractions = async (res) => {
  const attractions = await Attraction.find();
  res.send(attractions);
};

/*
 * Find items by ID
 */
app.get("/api/activities/:id", async (req, res) => {
  getActivity(res, req.params.id);
});

const getActivity = async (res, id) => {
  const activity = await Activity.findOne({ _id: id });
  res.send(activity);
};

app.get("/api/attractions/:id", async (req, res) => {
  getAttraction(res, req.params.id);
});

const getAttraction = async (res, id) => {
  const attraction = await Attraction.findOne({ _id: id });
  res.send(attraction);
};

// Adds item via form
app.post("/api/activities", upload.single("img"), (req, res) => {
  const result = validateInfo(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const activity = new Activity({
    nameOfLocation: req.body.nameOfLocation,
    typeOfLocation: req.body.typeOfLocation,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    hoursOpen: req.body.hoursOpen,
    hoursClose: req.body.hoursClose,
    googleReview: req.body.googleReview,
    longDescription: req.body.longDescription,
    shortDescription: req.body.shortDescription,
    att: req.body.att,
  });

  if (req.file) {
    activity.img = "images/activities/" + req.file.filename;
  }

  createActivity(res, activity);
});

const createActivity = async (res, activity) => {
  const result = await activity.save();
  res.send(result);
};

app.post("/api/attractions", upload.single("img"), (req, res) => {
  const result = validateInfo(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const attraction = new Attraction({
    nameOfLocation: req.body.nameOfLocation,
    typeOfLocation: req.body.typeOfLocation,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    hoursOpen: req.body.hoursOpen,
    hoursClose: req.body.hoursClose,
    googleReview: req.body.googleReview,
    longDescription: req.body.longDescription,
    shortDescription: req.body.shortDescription,
    att: req.body.att,
  });

  if (req.file) {
    attraction.img = "images/activities/" + req.file.filename;
  }

  createAttraction(res, attraction);
});

const createAttraction = async (res, attraction) => {
  const result = await attraction.save();
  res.send(result);
};

// Edit item via form
app.put("/api/activities/:id", upload.single("img"), (req, res) => {
  const result = validateInfo(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateActivity(req, res);
});

const updateActivity = async (req, res) => {
  let updates = {
    nameOfLocation: req.body.nameOfLocation,
    typeOfLocation: req.body.typeOfLocation,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    hoursOpen: req.body.hoursOpen,
    hoursClose: req.body.hoursClose,
    googleReview: req.body.googleReview,
    longDescription: req.body.longDescription,
    shortDescription: req.body.shortDescription,
    att: req.body.att,
  };

  if (req.file) {
    updates.img = "images/activities/" + req.file.filename;
  }

  const result = await Activity.updateOne({ _id: req.params.id }, updates);
  res.send(result);
};

app.put("/api/attractions/:id", upload.single("img"), (req, res) => {
  const result = validateInfo(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateAttraction(req, res);
});

const updateAttraction = async (req, res) => {
  let updates = {
    nameOfLocation: req.body.nameOfLocation,
    typeOfLocation: req.body.typeOfLocation,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    hoursOpen: req.body.hoursOpen,
    hoursClose: req.body.hoursClose,
    googleReview: req.body.googleReview,
    longDescription: req.body.longDescription,
    shortDescription: req.body.shortDescription,
    att: req.body.att,
  };

  if (req.file) {
    updates.img = "images/activities/" + req.file.filename;
  }

  const result = await Attraction.updateOne({ _id: req.params.id }, updates);
  res.send(result);
};

// Delete Items from the database
app.delete("/api/activities/:id", (req, res) => {
  deleteActivity(res, req.params.id);
});

const deleteActivity = async (res, id) => {
  const activity = await Activity.findByIdAndDelete(id);
  res.send(activity);
};

app.delete("/api/attractions/:id", (req, res) => {
  deleteAttraction(res, req.params.id);
});

const deleteAttraction = async (res, id) => {
  const attraction = await Attraction.findByIdAndDelete(id);
  res.send(attraction);
};

// Schema validation using JOI
const validateInfo = (data) => {
  const schema = joi.object({
    _id: joi.allow(""),
    nameOfLocation: joi.string().required(),
    typeOfLocation: joi.string().required(),
    longitude: joi.number().required(),
    latitude: joi.number().required(),
    address: joi.string().required(),
    phone: joi.string().allow(""),
    email: joi.string().email().allow(""),
    hoursOpen: joi.string().required(),
    hoursClose: joi.string().required(),
    googleReview: joi.string().required(),
    longDescription: joi.string().required(),
    shortDescription: joi.string().required(),
    att: joi.allow(""),
    img: joi.allow(""),
  });

  return schema.validate(data);
};
