const {
  users,
  isExist,
  createUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("./usersController");
const { Router } = require("express");
const cors = require("cors");

const userRouter = Router();

userRouter.get("/", cors(), users);
userRouter.post("/register", cors(), isExist, createUser);
userRouter.post("/login", cors(), loginUser);
userRouter.post("/logout", cors(), logoutUser);
userRouter.get("/current", cors(), currentUser);

module.exports = userRouter;
