const Router = require("express-promise-router");
const { read } = require("fs");

const {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  readyToView,
  draft,
} = require("../../controllers/projectController");

const router = new Router();

router.get("/", getAllProject);
router.get("/:projectId", getProjectById);
router.post("/readyToView", readyToView);
router.post("/draft", draft);
router.post("/create", createProject);
router.post("/:projectId", updateProject);
router.delete("/:projectid", deleteProject);

module.exports = router;
