const router = require("express").Router();
const { User, Blog } = require("../models");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    // id: req.body.id,
    // blog_title: req.body.blog_title,
    // description: req.body.description,
    // post_date: req.body.post_date,
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/blog/:id", async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id);
  res.render("blogs", { blog: blogData });
});

module.exports = router;
