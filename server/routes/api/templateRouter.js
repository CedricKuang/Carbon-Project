const Router = require("express-promise-router");
const { read } = require("fs");

const {
  getAllTemplates,
  getUserTemplates,
  createTemplate,
  readTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../../controllers/templateController");

const router = new Router();

router.get("/", getAllTemplates);
router.get("/:userId", getUserTemplates);
router.post("/create", createTemplate);
router.get("/:templateId", readTemplate);
router.post("/:templateId", updateTemplate);
router.delete("/:templateId", deleteTemplate);

module.exports = router;
