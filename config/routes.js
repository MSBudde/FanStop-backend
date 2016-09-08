var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var usersCtrl = require('../controllers/users');
var token = require('../config/tokens');
var barsCtrl = require('../controllers/bars')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FanSpot'});
});

router.get('/api/users', usersCtrl.index)
router.post('/api/users', usersCtrl.create);
router.get( '/api/users/me', token.authenticate, usersCtrl.currentUser);

router.post('/api/token',token.create);

router.get('/api/bars', barsCtrl.index)
router.post('/api/bars', barsCtrl.create);
router.patch('/api/bars/:id', barsCtrl.updateBar)


// router.get('/auth/facebook',
//   passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


module.exports = router;
