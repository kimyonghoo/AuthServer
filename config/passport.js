const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../schemas/User');
require('dotenv').config();

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    })
  });

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, req.flash('signinMessage', 'ID does not exist'));
      if (!user.validPassword(password, user.password)) return done(null, false, req.flash('signinMessage', 'Wrong password'));
      return done(null, user);
    });
  }));

  //JWT Strategy
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
        return User.findOne({'email': jwtPayload})
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
    ));
}