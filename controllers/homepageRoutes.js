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
  res.render("dashboard", { loggedIn: req.session.loggedIn });
});

router.get("/blog/:id", async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id);
  res.render("blogs", { loggedIn: req.session.loggedIn, blog: blogData });
});

router.get("/logout", async (req, res) => {
  res.render("logout");
});

module.exports = router;
