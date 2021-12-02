const { Router } = require("express");
const { removeUser, changeRights } = require("./adminController");
const { checkRights, authorization } = require("../middlewares/middlewares");

const adminRouter = Router();

adminRouter.post(
  "/rights",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin");
  },
  changeRights,
);
adminRouter.delete(
  "/user",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin");
  },
  removeUser,
);

module.exports = adminRouter;
