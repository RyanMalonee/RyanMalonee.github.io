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
