const e = require("express");
const { query } = require("./../settings/db");
const db = require("./../settings/db");

class articlesController {
  getArticles(req, res) {
    let sql = `SELECT articles.ID, articles.title, articles.text, name FROM articles INNER JOIN users ON articles.authorID = users.ID;`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(
          result.map((el) => {
            return {
              ID: el.ID,
              title: el.title,
              text: el.text,
              author: el.name,
            };
          }),
        );
      }
    });
  }

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

    let sql = `DELETE FROM articles WHERE ID = ${ID}`;

    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("The article was removed!");
      }
    });
  }

  editArticle(req, res) {
    const { ID, text, title } = req.body;
    const { name } = req.user;

    let sql = `UPDATE articles SET text = "${text}", title = "${title}" WHERE ID = "${ID}"`;

    db.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ ID, text, title, author: name });
      }
    });
  }
}

module.exports = new articlesController();
