const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const auth = require("../../utils/auth");

router.get("/:id", auth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    if (!blogData) {
      res.status(404).json({ message: "No blog with this id" });
      return;
    }

    const blogs = blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: { blog_id: blogData.id },
    });

    const commentMap = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    const commentUser = await Promise.all(
      commentMap.map(async (comment) => {
        const user = await User.findByPk(comment.user_id);
        const plainUser = user.get({ plain: true });
        const newComment = {
          ...comment,
          name: plainUser.name,
          authoredByUser: comment.name === req.session.name,
        };
        return newComment;
      })
    );

    // console.log({ commentUser });
    console.log({ blogs });

    res.render("blogs", {
      loggedIn: req.session.loggedIn,
      blogs,
      currentUser: req.session.name,
      user_id: req.session.user_id,
      commentUser,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err.message);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const data = await Comment.create({
      // ...req.body,
      content: req.body.content,
      user_id: req.session.user_id,
      blog_id: req.body.blog_id,
      name: req.session.name,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
    console.log(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Comment.update(
      { content: req.body.content },
      {
        where: {
          id: req.body.comment_id,
        },
      }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Comment.destroy({ where: { id: req.body.comment_id } });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
    console.log(err.message);
  }
});

module.exports = router;
