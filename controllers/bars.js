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
    lat: req.body.location.coordinate.latitude,
    lng: req.body.location.coordinate.longitude
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

var show = function(req, res, next){
  var id = req.params.id;

  Bar.findById(id, function(err, bar){
    if (err) {
      res.send(err);
    }

    res.json(bar);
  });


function updateBar(req, res, next) {
  var id = req.params.id;

  Bar.findById(id, function(err, bar) {

    if (err) {
      res.send(err);
    }
    console.log(req.body)
    if (req.body.team.name)  bar.votes.team  = req.body.team.name;

    
    bar.save(function(err, updatedBar) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("As long as you're advocating, human…");
      res.json(updatedBar);
    });
  });

}





module.exports = {
  index: index,
  create: create,
  show: show,
  updateBar: updateBar
}
