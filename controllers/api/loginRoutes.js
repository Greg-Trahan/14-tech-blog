const router = require("express").Router();
const Traveler = require("../../models/Traveler");
let CM = Traveler;
//cm is the current model being used

router.get("/", async (req, res) => {
  const data = await CM.findAll().catch((err) => {
    res.json(err);
  });
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const data = await CM.findByPk(req.params.id).catch((err) => {
    // return associated trips and list of locations
    res.json(err);
  });
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const data = await CM.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(data);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await CM.update(
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
    const removed = await CM.destroy({
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
