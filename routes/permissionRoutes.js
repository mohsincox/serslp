const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  permissionAdd,
  permissionGetAll,
  permissionGet,
  permissionUpdate,
  permissionDelete,
} = require("../controllers/permissionController");
const {
  checkDuplicatePermName,
  checkDuplicatePermNameUpdate,
} = require("../middlewares/permissionMiddleware");
require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    checkDuplicatePermName,
  ],
  permissionAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  permissionGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  permissionGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    checkDuplicatePermNameUpdate,
  ],
  permissionUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  permissionDelete
);

module.exports = router;
