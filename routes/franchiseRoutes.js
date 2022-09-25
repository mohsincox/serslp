const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  franchiseDelete,
  franchiseUpdate,
  uploadFranchiseLogo,
  franchiseGet,
  franchiseGetAll,
  franchiseAdd,
} = require("../controllers/franchiseController");
const {
  franchiseDuplicateCheck,
  franchiseDuplicateCheckUpdate,
} = require("../middlewares/franchiseMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadFranchiseLogo,
    franchiseDuplicateCheck,
  ],
  franchiseAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  franchiseGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  franchiseGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadFranchiseLogo,
    franchiseDuplicateCheckUpdate,
  ],
  franchiseUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  franchiseDelete
);

module.exports = router;
