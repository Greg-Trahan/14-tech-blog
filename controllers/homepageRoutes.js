const router = require("express").Router();
const { User, Blog } = require("../models");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/dashboard", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      // where: User.name === 0,
      include: [{ model: User, attributes: ["name"] }],
    });
    console.log(User.name);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: "No blog with this id" });
      return;
    }
    const blogs = blogData.get({ plain: true });
    res.render("blogs", { loggedIn: req.session.loggedIn, blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  res.render("logout", { loggedIn: req.session.loggedIn });
});

module.exports = router;
