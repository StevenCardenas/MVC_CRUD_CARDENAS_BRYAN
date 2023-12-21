const mysql = require("mysql2");

// Database config
module.exports.pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"vehiculodb"
});