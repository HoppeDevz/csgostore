const mysql = require("mysql");

module.exports = mysql.createConnection({
    localAddress: "127.0.0.1",
    user: "root",
    password: "",
    database: "csgostore"
})