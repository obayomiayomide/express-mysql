const prisma = require("../../dbConfig");

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const { userId } = req.user;
    const newComment = await prisma.post.create({
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
