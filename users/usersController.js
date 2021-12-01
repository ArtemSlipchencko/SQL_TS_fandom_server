const db = require("./../settings/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv");
const { nextTick } = require("process");

dotenv.config();

class UserController {
  users(req, res) {
    db.query(
      `SELECT users.ID, users.name, access.rights FROM users INNER JOIN access ON users.rights = access.ID`,
      (err, rows, fields) => {
        if (err) {
          console.log("ERROR: ", err);
        } else {
          res.status(200).json(rows);
        }
      },
    );
  }

  isExist(req, res, next) {
    const { name } = req.body;

    db.query(
      `SELECT name FROM users WHERE name = '${name}';`,
      (error, result) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          if (result.length > 0) {
            res.status(404).send("A user with the same name already exists!");
          } else {
            next();
          }
        }
      },
    );
  }

  async createUser(req, res) {
    const { name, login, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 14);

    const token = jwt.sign(
      {
        userID: name,
      },
      process.env.JWT_SECRET,
    );

    const sql = `INSERT INTO users(name, login, password, rights, token) VALUES ('${name}', '${login}', '${hashedPassword}', 4, '${token}');`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          text: "The user has been successfully created. Please login to your account!",
        });
      }
    });
  }

  loginUser(req, res) {
    return res.status(200).send("User is logged.");
  }

  currentUser() {
    return res.status(200).send("It's OK");
  }

  //   authorization(req, res, next) {

  //   }

  logoutUser(req, res) {
    return res.status(200).send("User is unlogged.");
  }
}

module.exports = new UserController();
