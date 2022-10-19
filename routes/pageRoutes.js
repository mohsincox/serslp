const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  pageAdd,
  pageGetAll,
  pageGet,
  pageUpdate,
  pageDelete,
} = require("../controllers/pageController");
// const {pageDuplicateCheck, pageDuplicateCheckUpdate} = require("../middlewares/pageMiddleware");

require("../config/passport")(passport);

router.post("/", pageAdd);
router.get("/", pageGetAll);
router.get("/:id", pageGet);
router.put("/:id", pageUpdate);
router.delete("/:id", pageDelete);

module.exports = router;
