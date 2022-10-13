const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  adsAdd,
  adsGetAll,
  adsGet,
  adsUpdate,
  adsDelete,
} = require("../controllers/adsController");
// const {adsDuplicateCheck, adsDuplicateCheckUpdate} = require("../middlewares/adsMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  // [
  //   passport.authenticate("jwt", {
  //     session: false,
  //   }),
  // ],
  adsAdd
);

router.get("/", adsGetAll);

router.get("/:id", adsGet);

router.put(
  "/:id",
  // [
  //   passport.authenticate("jwt", {
  //     session: false,
  //   }),
  //
  // ],
  adsUpdate
);

router.delete(
  "/:id",
  // passport.authenticate("jwt", {
  //   session: false,
  // }),
  adsDelete
);

module.exports = router;
