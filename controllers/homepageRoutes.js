const router = require("express").Router();
const { User, Blog } = require("../models");

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
      where: Blog.user_id === req.session.user_id,
      include: [{ model: User, attributes: ["name"] }],
    });
    console.log(blogData);
    console.log(req.session.user_id);

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log(req.session);

    res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  res.render("logout", { loggedIn: req.session.loggedIn });
});

module.exports = router;
