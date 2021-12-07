const { Router } = require("express");
const {
  authorization,
  checkRights,
  checkArticleAuthor,
} = require("./../middlewares/middlewares");
const {
  getArticles,
  createArticle,
  removeArticle,
  editArticle,
} = require("./articlesController");

const articlesRouter = Router();

articlesRouter.get("/article", getArticles);
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
  checkArticleAuthor,
  removeArticle,
);
articlesRouter.patch(
  "/article",
  authorization,
  (req, res, next) => {
    checkRights(req, res, next, "admin moder author");
  },
  checkArticleAuthor,
  editArticle,
);

module.exports = articlesRouter;
