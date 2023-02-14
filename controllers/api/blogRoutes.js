const router = require("express").Router();
const Blog = require("../../models/Blog");

router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const commentData = await Comment.findAll({
      where: { blog_id: blogData.id },
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog with this id" });
      return;
    }
    const blogs = blogData.get({ plain: true });
    const comments = commentData.get({ plain: true });
    res.render("blogs", { loggedIn: req.session.loggedIn, blogs, comments });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/:id", async (req, res) => {
//   try {
//     const data = await User.create(req.body);
//     req.session.save(() => {
//       req.session.loggedIn = true;
//       req.session.user_id = data.id;
//       res.status(200).json(data);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
