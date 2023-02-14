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
      // include: [{ model: User, attributes: ["name"] }],
    });

    const commentMap = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    const commentUser = await Promise.all(
      commentMap.map(async (comment) => {
        const user = await User.findByPk(comment.user_id);
        const plainUser = user.get({ plain: true });
        const newComment = { ...comment, name: plainUser.name };
        // console.log(newComment);
        return newComment;
      })
    );

    //New comment is what I want
    console.log({ commentUser });

    res.render("blogs", {
      loggedIn: req.session.loggedIn,
      blogs,
      commentUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const data = await Comment.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Comment.update(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Comment.destroy(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
