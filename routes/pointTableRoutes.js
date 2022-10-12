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

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
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
