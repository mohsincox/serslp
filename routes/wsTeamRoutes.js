const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  teamAdd,
  viewTeam,
  viewTeamDetail,
  confirmTeam,
} = require("../controllers/wsTeamController");
require("../config/passport")(passport);

router.post(
  "/build",
  passport.authenticate("jwt", {
    session: false,
  }),
  teamAdd
);

router.get(
  "/view/:userId",
  passport.authenticate("jwt", {
    session: false,
  }),
  viewTeam
);

router.get(
  "/view-detail/:userId",
  passport.authenticate("jwt", {
    session: false,
  }),
  viewTeamDetail
);

router.get(
  "/confirm/:userId",
  passport.authenticate("jwt", {
    session: false,
  }),
  confirmTeam
);

module.exports = router;
