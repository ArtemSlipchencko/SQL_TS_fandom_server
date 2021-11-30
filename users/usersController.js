class UserController {
  createUser(req, res) {
    return res.status(200).send("User is created.");
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
