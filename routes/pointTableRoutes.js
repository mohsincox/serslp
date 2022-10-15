const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  pointTableAdd,
  pointTableGetAll,
  pointTableGet,
  pointTableUpdate,
  pointTableDelete,
} = require("../controllers/pointTableController");
const {
  pointTableDuplicateCheck,
  pointTableDuplicateCheckUpdate,
} = require("../middlewares/pointTableMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    pointTableDuplicateCheck,
  ],
  pointTableAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  pointTableGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  pointTableGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    pointTableDuplicateCheckUpdate,
  ],
  pointTableUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  pointTableDelete
);

module.exports = router;
