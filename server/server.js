// Module imports
const express = require("express");
const cors = require("cors");

// Let's refer to Express as app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route Imports
const vehiculoRouter = require("./routes/vehiculoRoutes");

// Routes
app.use(vehiculoRouter);

const port = 3001;
app
  .listen(port, () => console.log(`Servidor levantado en http://localhost:${port}`))
  .on("error", (error) => console.error(error));