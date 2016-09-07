var mongoose = require('mongoose');

var barSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  address: String,
  icon: String,
  comments: [{
    text: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'}
    }
  }]

})

module.exports = mongoose.model('Bar', barSchema)
