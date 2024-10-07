const prisma = require("../../dbConfig");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { userId } = req.user;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

exports.editPost = async (req, res) => {
  const { postId, title, content } = req.body;
  const { userId } = req.user;
  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });
    if (!postExist) {
      return res
        .status(404)
        .json({ error: "Post does not exist or author unauthorized" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title ?? postExist.title,
        content: content ?? postExist.content,
      },
    });
    res.status(201).json({
      message: "Post updated successfully",
      success: true,
      updatedPost,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error updating post", success: false });
  }
};

exports.findPost = async (req, res) => {
  const { postId } = req.body;
  const { userId } = req.user;
  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });
    if (!postExist) {
      return res
        .status(404)
        .json({ error: "Post does not exist or author unauthorized" });
    }

    const foundPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    res.status(201).json({
      message: "Post found successfully",
      success: true,
      foundPost,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error finding post", success: false });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.body;
  const { userId } = req.user;
  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });
    if (!postExist) {
      return res
        .status(404)
        .json({ error: "Post does not exist or author unauthorized" });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(201).json({
      message: "Post deleted successfully",
      success: true,
      deletedPost,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error deleting post", success: false });
  }
};
