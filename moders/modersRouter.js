const { Router } = require("express");
const { authorization, checkRights } = require("./../middlewares/middlewares");
const { removeArticle, removeComment } = require("./modersController");

const moderRouter = Router();

moderRouter.delete(
  "/article",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin moder");
  },
  removeArticle,
);
moderRouter.delete(
  "/comment",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin moder");
  },
  removeComment,
);

module.exports = moderRouter;
