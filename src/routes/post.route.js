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
router.delete("/delete", authMiddleware, deletePost);
router.get("/find", authMiddleware, findPost);

module.exports = router;
