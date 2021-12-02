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

  isExistError(req, res, next) {
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

  isExistSuccess(req, res, next) {
    const { name, password } = req.body;

    db.query(
      `SELECT name, password FROM users WHERE name = '${name}';`,
      (error, result) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          if (result.length > 0) {
            const isPasswordValid = bcrypt.compareSync(
              password,
              result[0].password,
            );
            if (isPasswordValid) {
              next();
            } else {
              res
                .status(400)
                .send(
                  "You entered an invalid username and password combination!",
                );
            }
          } else {
            res
              .status(400)
              .send(
                "You entered an invalid username and password combination!",
              );
          }
        }
      },
    );
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

  authorization(req, res, next) {
    const authHeader = req.get("Authorization");

    if (authHeader === null) {
      return res.status(401).send("Some error!");
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = payload;

    if (!name) {
      res.status(401).send("Some error!");
    }

    req.name = name;
    req.token = token;

    next();
  }

  currentUser(req, res) {
    const { name } = req;

    let sql =
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
