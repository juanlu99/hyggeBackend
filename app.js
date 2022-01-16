'use strict';

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
app.use(express.static('public'));

const usersRoutes = require('./app/routes/users-routes');
const spacesRoutes = require('./app/routes/spaces-routes');


app.use('/api/v1/users/', usersRoutes);

app.use('/api/v1/spaces/', spacesRoutes);

app.listen(PORT, () => console.log(`Running ${PORT}`));
