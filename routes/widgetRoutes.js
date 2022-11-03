const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  widgetAdd,
  widgetGetAll,
  widgetGet,
  widgetUpdate,
  widgetDelete,
} = require("../controllers/widgetController");
// const {widgetDuplicateCheck, widgetDuplicateCheckUpdate} = require("../middlewares/widgetMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
  ],
  widgetAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  widgetGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  widgetGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
  ],
  widgetUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  widgetDelete
);

module.exports = router;
