const { Router } = require("express");
const { authorization, checkRights } = require("./../middlewares/middlewares");
const { createArticle, removeArticle } = require("./articlesController");

const articlesRouter = Router();

articlesRouter.post(
  "/article",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin moder author");
  },
  createArticle,
);
articlesRouter.delete(
  "/article",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin moder author");
  },
  removeArticle,
);

module.exports = articlesRouter;
