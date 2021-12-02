const db = require("./../settings/db");

class AdminController {
  changeRights(req, res) {
    const { name, rights } = req.body;

    let sql = `UPDATE users SET rights = "${rights}" WHERE name = "${name}"`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `SELECT rights FROM access WHERE ID = ${rights}`,
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res
                .status(200)
                .json({ text: `User ${name} is now an ${results[0].rights}` });
            }
          },
        );
      }
    });
  }

  removeUser(req, res) {
    const { name } = req.body;

    let sql = `DELETE FROM users WHERE name = "${name}"`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("User has been deleted!");
      }
    });
  }
}

module.exports = new AdminController();
