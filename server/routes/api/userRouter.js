const Router = require("express-promise-router");

const {
  handleError,
  getUserDate,
  setUserDate,
  updateUser,
  removeUser,
  getUserSection,
  getCurrentUser,
} = require("../../controllers/userController");

const router = new Router();

router.get("/:year-:month-:day", getUserDate);
router.post("/:year-:month-:day", setUserDate);
router.patch("/", updateUser);
router.delete("/:id", removeUser);
router.get("/get_current_user", getCurrentUser);

router.get("/:userId", getUserSection);

module.exports = router;
