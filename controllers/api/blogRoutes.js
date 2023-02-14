const router = require("express").Router();
const Blog = require("../../models/Blog");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const auth = require("../../utils/auth");

router.get("/:id", auth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    console.log(blogData);

    const commentData = await Comment.findAll({
      where: { blog_id: blogData.id },
      include: [{ model: User, attributes: ["name"] }],
    });

    console.log(commentData);

    if (!blogData) {
      res.status(404).json({ message: "No blog with this id" });
      return;
    }
    const blogs = blogData.get({ plain: true });
    const comments = commentData.get({ plain: true });

    res.render("blogs", { loggedIn: req.session.loggedIn, blogs, comments });
  } catch (err) {
    console.log("You done messed up");
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
