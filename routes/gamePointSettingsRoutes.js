const express = require("express");
const router = express.Router();
const passport = require("passport");
const {gamePointSettingsGet, gamePointSettingsUpdate} = require("../controllers/gamePointSettingController");

require("../config/passport")(passport);

router.get(
    "/:name",
    // passport.authenticate("jwt", {
    //     session: false,
    // }),
    gamePointSettingsGet
);

router.put(
    "/:name",
    // passport.authenticate("jwt", {
    //     session: false,
    // }),
    gamePointSettingsUpdate
);


module.exports = router;
