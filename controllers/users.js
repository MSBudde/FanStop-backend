var User = require("../models/User");

function index(req, res, next) {
  User.find({}, function(error, users) {
    if (error) res.json({msg: 'Could not find any users'});

    res.json({users: users});
  }).select('-__v');
}


function create(req, res, next) {
  if (!req.body.password) {
    return status(422).json('missing required fields!')
  }
  User
  .create(req.body)
  .then(function(user) {
    res.json({
      success: true,
      message: 'Successfully created user.',
      data: {
        email: user.email,
        id:    user._id
      }
    });
  }).catch(function(err) {
    if (err.message.match(/E11000/)) {
      err.status = 409;
    } else {
      err.status = 422;
    }
    next(err);
  });
};

function currentUser(req, res, next) {
  User
   .findOne({email: req.decoded.email}).exec()
   .then(function(user) {
     res.json({
       success: true,
       message: 'Successfully retrieved user data.',
       data: user
     });
   })
   .catch(function(err) {
     next(err);
   });
}

module.exports = {
  index: index,
  create: create,
  currentUser: currentUser
}
