const db = require("./../settings/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv");

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

  createUser(req, res) {
    const { name, login, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 14);

    const sql = `INSERT INTO users(name, login, password, rights) VALUES ('${name}', '${login}', '${hashedPassword}', 4);`;

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
    const { name } = req.body;

    const token = jwt.sign(
      {
        name,
      },
      process.env.JWT_SECRET,
    );

    let sql =
      'UPDATE `users` SET `token` = "' +
      token +
      '" WHERE `name` = "' +
      name +
      '";';

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    sql =
      'SELECT users.ID, name, access.rights, token FROM users INNER JOIN access ON users.rights = access.ID WHERE name = "' +
      name +
      '"';

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ text: "You are logged!", result });
      }
    });
  }

  currentUser(req, res) {
    res.status(200).json({ ...req.user });

    // let sql =
    //   'SELECT users.ID, name, access.rights, token FROM users INNER JOIN access ON users.rights = access.ID WHERE name = "' +
    //   name +
    //   '"';

    // db.query(sql, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.status(200).json({ text: "You are logged!", result });
    //   }
    // });
  }

  logoutUser(req, res) {
    const { name } = req;

    let sql =
      'UPDATE `users` SET `token` = NULL WHERE `name` = "' + name + '";';

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("You are unlogged!");
      }
    });
  }
}

module.exports = new UserController();
