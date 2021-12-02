const { Router } = require("express");
const { authorization } = require("./../middlewares/middlewares");
const { createArticle, removeArticle } = require("./articlesController");

const articlesRouter = Router();

articlesRouter.post("/article", authorization, createArticle);
articlesRouter.delete("/article", authorization, removeArticle);

module.exports = articlesRouter;
