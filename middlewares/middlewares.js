const db = require("./../settings/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Middlewares {
  checkRights(req, res, next, accessRights) {
    const { name } = req;

    let sql = `SELECT access.rights FROM access INNER JOIN users ON users.rights = access.ID WHERE name = "${name}"`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (accessRights.includes(result[0].rights)) {
          next();
        } else {
          res.status(403).send("You have not access!");
        }
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
      return res.status(401).send("Some error!");
    }

    let sql = `SELECT ID, name FROM users WHERE name = "${name}"`;
    const results = [];

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].name === name) {
          req.user = {
            ID: result[0].ID,
            name,
            token,
          };

          next();
        }
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
}

module.exports = new Middlewares();
