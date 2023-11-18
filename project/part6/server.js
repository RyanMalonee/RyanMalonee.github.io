const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const upload = multer({ dest: __dirname + "/public/images" });

app.listen(3000, () => {
  console.log("Listening");
});

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

// JSON data

app.get("/api/activities", async (req, res) => {
  const activities = await getActivities();
  res.send(activities);
});

const getActivities = async () => {
  const url = "http://localhost:3000/json/activities.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/attractions", async (req, res) => {
  const attractions = await getAttractions();
  res.send(attractions);
});

const getAttractions = async () => {
  const url = "http://localhost:3000/json/attractions.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// Add item via form
app.post("api/activities", upload.single("img"), (req, res) => {
  const result = validateInfo(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //PICK UP HERE
});

const validateInfo = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    type: joi.string().required(),
    longitude: joi.number().required(),
    latitude: joi.number().required(),
    address: joi.string().required(),
    phone: joi.string().phone().required(),
    email: joi.string().email().required(),
    hoursOpen: joi.string().required(),
    hoursClose: joi.string().required(),
    googleReview: joi.string().required(),
    longDescription: joi.string().required(),
    shortDescription: joi.string().required(),
    //img: joi.string().required(),
  });

  return schema.validate(data);
};
