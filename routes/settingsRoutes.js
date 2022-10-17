const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  settingsAdd,
  settingsGetAll,
  settingsGet,
  settingsUpdate,
  settingsDelete,
} = require("../controllers/settingsController");

require("../config/passport")(passport);

// router.post(
//   "/",
//   [
//     passport.authenticate("jwt", {
//       session: false,
//     }),
//     // settingsDuplicateCheck,
//   ],
//   settingsAdd
// );

// router.get(
//   "/",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   settingsGetAll
// );

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  settingsGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    // settingsDuplicateCheckUpdate,
  ],
  settingsUpdate
);

// router.delete(
//   "/:id",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   settingsDelete
// );

module.exports = router;
