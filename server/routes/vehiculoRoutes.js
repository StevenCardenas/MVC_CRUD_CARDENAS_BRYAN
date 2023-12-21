const express = require("express");
const router = express.Router();
const vehiculoControlador = require("../controlador/vehiculoControlador");

// Users Endpoint
router.get("/api/vehiculos", vehiculoControlador.getAllVehiculos);
router.post("/api/add", vehiculoControlador.createVehiculo);
router.put("/api/put/:placa", vehiculoControlador.updateVehiculo);
router.delete("/api/delete/:placa", vehiculoControlador.deleteVehiculo);

module.exports = router;