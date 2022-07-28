const Router = require("express-promise-router");

const { 
  checkAdmin, 
  checkSuperAdmin,
  getAllUsers,
  getAllProjects,
  isAdmin,
  isSuperAdmin,
  promote,
  demote,
  createSection,
  deleteSection,
  getAllSections,
  assignSection,
  removeSection,
  approve,
  deny,
  changesRequested,
} = require("../../controllers/adminController");

const router = new Router();

router.get("/is_admin", checkAdmin);
router.get("/is_superAdmin", checkSuperAdmin);
router.get("/users", isAdmin, getAllUsers);
router.get("/projects", isAdmin, getAllProjects);

router.post("/promote", isAdmin, promote);
router.post("/demote", isSuperAdmin, demote);
router.post("/approve", isAdmin, approve);
router.post("/deny", isAdmin, deny);
router.post("/changesRequested", isAdmin, changesRequested);

router.post("/createSection", isAdmin, createSection);
router.delete("/:sectionid", isAdmin, deleteSection);
router.get("/sections", isAdmin, getAllSections);
router.post("/assign", isAdmin, assignSection);
router.post("/remove", isAdmin, removeSection);

module.exports = router;
