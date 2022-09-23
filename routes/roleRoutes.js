const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  roleAdd,
  roleGetAll,
  roleGet,
  roleUpdate,
  roleDelete,
  rolePermissionsAdd,
} = require("../controllers/roleController");
const {
  checkDuplicateRoleName,
  checkDuplicateRoleNameUpdate,
} = require("../middlewares/roleMiddleware");
require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    checkDuplicateRoleName,
  ],
  roleAdd
);

router.post(
  "/permissions/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
  ],
  rolePermissionsAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    checkDuplicateRoleNameUpdate,
  ],
  roleUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleDelete
);

module.exports = router;
