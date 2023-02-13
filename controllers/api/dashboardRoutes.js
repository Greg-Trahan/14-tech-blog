const router = require("express").Router();
const Blog = require("../../models/Blog");

router.post("/", async (req, res) => {
  try {
    const data = await Blog.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(data);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Blog.update(
      { traveler_name: req.body.traveler_name },
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
