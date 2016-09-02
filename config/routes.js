var express  = require('express');
var router   = express.Router();
var passport = require('passport')
var User     = require('../models/User')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'FanSpot'});
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
