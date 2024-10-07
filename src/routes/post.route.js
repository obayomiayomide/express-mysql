const express = require("express");
const {
  createPost,
  editPost,
  deletePost,
  findPost,
} = require("../controller/post.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.put("/edit", authMiddleware, editPost);
router.post("/delete", authMiddleware, deletePost);
router.post("/find", authMiddleware, findPost);

module.exports = router;
