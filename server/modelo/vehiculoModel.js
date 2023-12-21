const { pool } = require("../db/db");
module.exports = {
  queryAllVehicles: () => {
    console.log("Ruta /api/vehiculos consulta realizada");
    return pool
      .promise()
      .query("SELECT * FROM vehiculo")
      .then(([results]) => results)
      .catch((err) => console.log(err));
  },
  queryAddVehicle:(values) => {
    console.log("Ruta /api/add vehículo añadido");
    return pool
      .promise()
      .query("INSERT INTO vehiculo(placa, marca, modelo, año, color) VALUES (?)", [values])
      .then(([results]) => results)
      .catch((err) => console.log(err));
  },
  queryDeleteVehicle:(placa) => {
    console.log("Ruta /api/delete vehículo eliminado");
    return pool
      .promise()
      .query("DELETE FROM vehiculo WHERE placa = ?", [placa])
      .then(([results]) => results)
      .catch((err) => console.log(err));
  },
  queryUpdateVehicle:(data, placa) => {
    console.log("Ruta /api/update vehículo actualizado");
    return pool
      .promise()
      .query("UPDATE vehiculo SET ? WHERE placa = ?", [data, placa])
      .then(([results]) => results)
      .catch((err) => console.log(err));
  },
};