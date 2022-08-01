const Router = require("express-promise-router");
const { read } = require("fs");

const {
  getAllTemplates,
  getUserTemplates,
} = require("../../controllers/templateController");

const router = new Router();

router.get("/", isAdmin, getAllTemplates);
router.get("/:userId", getUserTemplates);

module.exports = router;
