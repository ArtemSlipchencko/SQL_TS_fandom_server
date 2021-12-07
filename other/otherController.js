const db = require("./../settings/db");

class OtherController {
  getComments(req, res) {
    const { articleID } = req.body;

    let sql = `SELECT ID, text, name FROM comments INNER JOIN users ON users.ID = comments.authorID WHERE articleID = ${articleID};`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(
          result.map((el) => {
            return {
              commentID: el.ID,
              text: el.text,
              author: el.authorID,
            };
          }),
        );
      }
    });
  }

  createOwnComment(req, res) {
    const { articleID, text } = req.body;
    const { ID } = req.user;

    let sql = `INSERT INTO comments(authorID, articleID, text) VALUES (${ID}, ${articleID}, "${text}")`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        sql = `SELECT comments.ID, text, name FROM comments INNER JOIN users ON comments.authorID = users.ID WHERE comments.articleID = ${articleID}`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(
              result.map((el) => {
                return {
                  commentID: el.ID,
                  text: el.text,
                  author: el.name,
                };
              }),
            );
          }
        });
      }
    });
  }

  removeOwnComment(req, res) {
    const { articleID, commentID } = req.body;

    let sql = `DELETE FROM comments WHERE ID = "${commentID}"`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        sql = `SELECT comments.ID, text, name FROM comments INNER JOIN users ON comments.authorID = users.ID WHERE comments.articleID = ${articleID}`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(
              result.map((el) => {
                return {
                  commentID: el.ID,
                  text: el.text,
                  author: el.name,
                };
              }),
            );
          }
        });
      }
    });
  }

  editOwnComment(req, res) {
    const { articleID, commentID, text } = req.body;
    const { name } = req.user;

    let sql = `UPDATE comments SET text = "${text}" WHERE ID = "${commentID}"`;

    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        sql = `SELECT comments.ID, text, name FROM comments INNER JOIN users ON comments.authorID = users.ID WHERE comments.articleID = ${articleID}`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(
              result.map((el) => {
                return {
                  commentID: el.ID,
                  text: el.text,
                  author: el.name,
                };
              }),
            );
          }
        });
      }
    });
  }
}

module.exports = new OtherController();
