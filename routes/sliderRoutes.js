const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  sliderAdd,
  sliderGetAll,
  sliderGet,
  sliderUpdate,
  uploadSliderImage,
  sliderDelete,
} = require("../controllers/sliderController");
const {
  sliderDuplicateCheck,
  sliderDuplicateCheckUpdate,
} = require("../middlewares/sliderMiddleware");

require("../config/passport")(passport);

router.post(
  "/",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadSliderImage,
    sliderDuplicateCheck,
  ],
  sliderAdd
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  sliderGetAll
);

router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  sliderGet
);

router.put(
  "/:id",
  [
    passport.authenticate("jwt", {
      session: false,
    }),
    uploadSliderImage,
    sliderDuplicateCheckUpdate,
  ],
  sliderUpdate
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  sliderDelete
);

module.exports = router;
