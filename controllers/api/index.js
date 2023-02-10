const router = require("express").Router();
const loginRoutes = require("./loginRoutes");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/login", loginRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
