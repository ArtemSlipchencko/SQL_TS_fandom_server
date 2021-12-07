const Router = require("express");
const {
  createOwnComment,
  removeOwnComment,
  editOwnComment,
} = require("./otherController");
const {
  authorization,
  checkCommentAuthor,
} = require("./../middlewares/middlewares");

const otherRouter = Router();

otherRouter.post("/comment", authorization, createOwnComment);
otherRouter.patch(
  "/comment",
  authorization,
  checkCommentAuthor,
  editOwnComment,
);
otherRouter.delete(
  "/comment",
  authorization,
  checkCommentAuthor,
  removeOwnComment,
);

module.exports = otherRouter;
