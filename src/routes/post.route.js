const express = require('express');
const { createPost, editPost } = require('../controller/post.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.put('/edit', authMiddleware, editPost);

module.exports = router;
