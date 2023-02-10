const router = require("express").Router();
const User = require("../../models/User");

router.post("/signup", async (req, res) => {
  try {
    const data = await User.create(req.body);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = data.id;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error("Incorrect emnail/password");
    }
    if (!user.checkPassword(req.body.password)) {
      throw new Error("Incorrect emnail/password");
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = data.id;
      res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
