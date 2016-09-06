var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var usersCtrl = require('../controllers/users');
var token = require('../config/tokens');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'FanSpot'});
});


router.post('/api/users', usersCtrl.create);
router.get( '/api/users/me', token.authenticate, usersCtrl.currentUser);

router.post('/api/token',token.create);

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;
