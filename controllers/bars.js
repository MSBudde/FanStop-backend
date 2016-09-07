var Bar = require("../models/Bar");

function index(req, res, next) {
  Bar.find({}, function(error, bars) {
    if (error) res.json({msg: 'Could not find any bars'});

    res.json({bars: bars});
  }).select('-__v');
}


function create(req, res, next) {
  Bar
  .create(req.body)
  .then(function(bar) {
    res.json({
      success: true,
      message: 'Successfully created bar.',
      data: {
        name: bar.name,
        address: bar.location,
        id: bar._id
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

function currentBar(req, res, next) {
  Bar
   .findOne({email: req.decoded.email}).exec()
   .then(function(bar) {
     res.json({
       success: true,
       message: 'Successfully retrieved bar data.',
       data: bar
     });
   })
   .catch(function(err) {
     next(err);
   });
}


  function findOrCreate(data, cb) {
    var bar = new this();
    this.findOne({name: data.name}, function(err, result){
      if(!result){
        bar.name = data.name;
        bar.save(cb)
      } else {
        cb(err, result)
      }
    })
  }

  function destroyALL(req, res, next) {

    Bar.remove({}, function(err) {
  // Only triggers if there is a major problem; will not fail if trying to remove something that isn't there
    if (err) next(err);

  // If it's a successful delete
  res.json({msg: "Your search has been deleted, good sir or madam."});
});
  }

module.exports = {
  index: index,
  create: create,
  currentBar: currentBar,
  findOrCreate: findOrCreate,
  destroyALL: destroyALL
}
