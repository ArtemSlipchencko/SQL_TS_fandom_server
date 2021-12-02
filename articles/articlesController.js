const db = require("./../settings/db");

class articlesController {
  createArticle(req, res) {
    const { ID } = req.user;
    const { title, text } = req.body;

    let sql = `INSERT INTO articles(title, text, authorID) VALUES ("${title}", "${text}", ${ID})`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("The article was published!");
      }
    });
  }

  removeArticle(req, res) {
    const { ID } = req.body;
    const { name } = req.user;

    let sql = `SELECT users.name FROM users INNER JOIN articles ON articles.authorID = users.ID;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].name === name) {
          sql = `DELETE FROM articles WHERE ID = ${ID}`;

          db.query(sql, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send("The article was removed!");
            }
          });
        } else {
          res.status(400).send("You have not access!");
        }
      }
    });
  }
}

module.exports = new articlesController();
