const router = require("express").Router();
const User = require("../../models/User");

router.post("/signup", async (req, res) => {
  try {
    const data = await User.create(req.body);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = data.id;
      req.session.name = data.name;
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
      req.session.user_id = user.id;
      req.session.name = user.name;
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
