const express = require("express");
const {
  createComment,
  editComment,
  deleteComment,
  findComment,
  findAllComment,
} = require("../controller/comment.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.put("/edit", authMiddleware, editComment);
router.delete("/delete", authMiddleware, deleteComment);
router.get("/find", findComment);
router.get("/findAll", findAllComment);

module.exports = router;
