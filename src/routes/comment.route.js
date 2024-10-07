const express = require("express");
const {
  createComment,
  editComment,
  deleteComment,
  findComment,
} = require("../controller/comment.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.put("/edit", authMiddleware, editComment);
router.delete("/delete", authMiddleware, deleteComment);
router.get("/find", authMiddleware, findComment);

module.exports = router;
