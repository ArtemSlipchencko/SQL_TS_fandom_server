const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3305,
  user: "root",
  password: "root",
  database: "fandom",
});

connection.connect((error) => {
  if (error) {
    console.log("ERROR: ", error);
  } else {
    console.log("Database connection successful!");
  }
});

module.exports = connection;
