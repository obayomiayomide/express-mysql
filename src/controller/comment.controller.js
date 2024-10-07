const prisma = require("../../dbConfig");

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const { userId } = req.user;
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
    });
    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error adding comment" });
  }
};

exports.editComment = async (req, res) => {
  const { commentId, content } = req.body;
  const { userId } = req.user;
  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentId,
        userId,
      },
    });
    if (!commentExist) {
      return res
        .status(404)
        .json({ error: "Comment does not exist or author unauthorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
        userId,
      },
      data: {
        content: content ?? commentExist.content,
      },
    });
    res.status(201).json({
      message: "Comment updated successfully",
      success: true,
      updatedComment,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error updating comment", success: false });
  }
};

exports.findComment = async (req, res) => {
  const { commentId } = req.body;
  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!commentExist) {
      return res
        .status(404)
        .json({ error: "Comment does not exist or author unauthorized" });
    }

    const foundComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    res.status(201).json({
      message: "Comment found successfully",
      success: true,
      foundComment,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error finding comment", success: false });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const { userId } = req.user;
  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentId,
        userId,
      },
    });
    if (!commentExist) {
      return res
        .status(404)
        .json({ error: "Comment does not exist or author unauthorized" });
    }

    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });
    res.status(201).json({
      message: "Comment deleted successfully",
      success: true,
      deletedComment,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res.status(500).json({ error: "Error deleting comment", success: false });
  }
};

exports.findAllComment = async (req, res) => {
  try {
    const foundAllComment = await prisma.comment.findMany();
    res.status(201).json({
      message: "All comments found successfully",
      success: true,
      foundAllComment,
    });
  } catch (error) {
    console.log("Error is: ", error);
    res
      .status(500)
      .json({ error: "Error finding all comment", success: false });
  }
};
