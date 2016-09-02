var mongoose         = require('mongoose');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User.js');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
