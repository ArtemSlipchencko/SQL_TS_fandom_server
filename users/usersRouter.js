const {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("./usersController");
const { Router } = require("express");
const cors = require("cors");

const userRouter = Router();

userRouter.post("/register", cors(), createUser);
userRouter.post("/login", cors(), loginUser);
userRouter.post("/logout", cors(), logoutUser);
userRouter.get("/current", cors(), currentUser);

module.exports = userRouter;
