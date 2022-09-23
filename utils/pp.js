const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const authConfig = require("../config/authConfig");
const db = require("../models");
const User = db.user;

module.exports = function (passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: authConfig.secret,
  };
  passport.use(
    "jwt",
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findByPk(jwt_payload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};
