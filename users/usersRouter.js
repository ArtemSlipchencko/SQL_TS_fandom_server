const {
  users,
  createUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("./usersController");
const { Router } = require("express");
const {
  authorization,
  isExistSuccess,
  isExistError,
} = require("./../middlewares/middlewares");

const userRouter = Router();

userRouter.get("/", users);
userRouter.post("/register", isExistError, createUser);
userRouter.post("/login", isExistSuccess, loginUser);
userRouter.post("/logout", authorization, logoutUser);
userRouter.get("/current", authorization, currentUser);

module.exports = userRouter;
