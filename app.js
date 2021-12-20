"use strict";

require(`dotenv`).config();
const cors = require(`cors`);
const express = require(`express`);
const app = express();
const fileUpload = require(`express-fileupload`);
const { PORT } = process.env;

app.use(fileUpload());

// Recibir datos como json en el body
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const spacesRoutes = require("./app/routes/spaces-routes");
const usersRouter = require("./app/routes/users-routes");

// POST api/v1/reviews
app.use("/api/v1/spaces/", spacesRoutes);
app.use("/api/v1/users/", usersRouter);

app.listen(PORT, () => console.log(`Running ${PORT}`));
