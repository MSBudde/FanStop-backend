var Bar = require("../models/Bar");

function index(req, res, next) {
  Bar.find({}, function(error, bars) {
    if (error) res.json({msg: 'Could not find any bars'});

    res.json({bars: bars});
  }).select('-__v');
}


function create(req, res, next) {
  var newBar = {
    name: req.body.name,
    address: req.body.location.address[0],
    lat: req.body.display_address.coordinate.lattitude,
    lng: req.body.display_address.coordinate.longitude
  }
  Bar.findOne({name: newBar.name}, function(err, storedBar) {
    console.log(storedBar)
    if(storedBar){
      res.json({message: 'bar already created'})
      console.log('did i get here')
    } else {
      Bar
      .create(newBar)
      .then(function(bar) {
        res.json({
          success: true,
          message: 'Successfully created bar.',
          data: {
            name: bar.name,
            address: bar.postal_code,
            id: bar._id
          }
        });
      }).catch(function(err) {
        console.log('am i here')
        if (err.message.match(/E11000/)) {
          err.status = 409;
        } else {
          err.status = 422;
        }
        next(err);
      });

    }
  } )
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





module.exports = {
  index: index,
  create: create,
  currentBar: currentBar
}
