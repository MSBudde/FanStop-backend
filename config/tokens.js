var jwt = require('jsonwebtoken');

 var User = require('../models/User');




function create(req, res,next) {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json('Missing email and/or password')
  }
  User
  .findOne({email: req.body.email}).exec().then(function(user) {
    if (!user || !user.verifyPasswordSync(req.body.password)) {
      return res.status(403).json('User not found or password is wrong')
    }
      var token = generateJwt(user);

      res.json(token)
  })
}

var jwtOptions = {
  algorithm: 'HS256',
  expiresIn: '7h'
};

function refresh(req, res, next) {
  User
   .findById(req.decoded._id).exec()
   .then(function(user) {
     var token = generateJwt(user);

     res.json(token);
   });
 }

function authenticate(req, res, next) {
  var token = findTheToken(req);
  if (!token) return next({status: 401, message:'Authenticate with token'});

  verifyJwt(token, next, function(decoded) {
    req.decoded = decoded;
    next();
  })
}

function findTheToken(req) {
  var token;

  var header = req.get('Authorization');
  if (!header) header = req.get('Authorisation');

   if (header) {
     var match = header.match(/(bearer|token) (.*)/i);
     token = match ? match[2] : match;
   }

   if (!token) {
     token = req.query.token;
   }

   return token;
 }


function verifyJwt(token, next, cb) {
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
     if (err && err.name === 'TokenExpiredError') {
       next({
         status:  401,
         message: 'Authorization failed (invalid_token): token expired.'
       });
     } else if (err) {
       next({
         status:  401,
         message: 'Authorization failed (invalid_token): token malformed.'
       });
     } else {
       cb(decoded);
     }
   });
 }

function generateJwt (user, options) {
  return jwt.sign(
    extractPayload(user, options),
    process.env.TOKEN_SECRET,
    jwtOptions
  )
}

function extractPayload(user, options) {
  return {
    email: user.email,
    username: user.username,
    use: 'fanStop_api'
  }
}

module.exports = {
  create: create,
  authenticate: authenticate,
  refresh: refresh
}
