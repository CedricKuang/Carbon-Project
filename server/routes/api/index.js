const Router = require("express-promise-router");
const ProjectRouter = require("./projectRouter");
const AdminRouter = require("./adminRouter");
const UserRouter = require("./userRouter");
const SectionRouter = require("./sectionRouter");
const TemplateRouter = require("./templateRouter");

const router = new Router();

router.use("/admin", AdminRouter);
router.use("/projects", ProjectRouter);
router.use("/user", UserRouter);
router.use("/section", SectionRouter);
router.use("/template", TemplateRouter);

router.get("/", async (req, res) => {
  console.log(req.user);
  res.status(200).send("Welcome to Carbon's API");
});

router.get("/isAdmin", async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);
  res.json({
    isAdmin: isAdmin,
  });
});

module.exports = router;
