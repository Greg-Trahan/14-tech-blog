const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const data = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("hello");
    await Blog.update(
      { blog_title: req.body.blog_title, description: req.body.description },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(req);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
