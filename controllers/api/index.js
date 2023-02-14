const router = require("express").Router();

const loginRoutes = require("./loginRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const blogRoutes = require("./blogRoutes");

router.use("/login", loginRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
