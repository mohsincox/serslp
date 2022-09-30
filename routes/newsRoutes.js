const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  uploadNewsImage,
  newsAdd,
  newsGetAll,
  newsGet,
  newsUpdate,
  newsDelete,
} = require("../controllers/newsController");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadNewsImage,
  ],
  newsAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  newsGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  newsGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadNewsImage,
  ],
  newsUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  newsDelete
);

module.exports = router;
