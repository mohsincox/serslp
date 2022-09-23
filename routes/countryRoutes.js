const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  countryAdd,
  countryGetAll,
  countryGet,
  countryUpdate,
  countryDelete,
  uploadFlag,
} = require("../controllers/countryController");
const {
  countryDuplicateCheckUpdate,
  countryDuplicateCheck,
} = require("../middlewares/countryMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadFlag,
    countryDuplicateCheck,
  ],
  countryAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  countryGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  countryGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadFlag,
    countryDuplicateCheckUpdate,
  ],
  countryUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  countryDelete
);

module.exports = router;
