"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");

const { PORT } = process.env;
const port = PORT | 3000;

app.use(fileUpload());

app.use(express.static("public"));

app.use(express.json());

app.use(cors());

const reviewsRouter = require("./app/routes/reviews-route");

app.use("/api/v1/reviews/", reviewsRouter);

app.listen(port, () => console.log(`Running ${port}`));
