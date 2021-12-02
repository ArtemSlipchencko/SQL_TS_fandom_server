const db = require("./../settings/db");

class ModerRouter {
  removeArticle(req, res) {
    res.send("It's OK");
  }

  removeComment(req, res) {
    res.send("It's OK");
  }
}

module.exports = new ModerRouter();
