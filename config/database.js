var mongoose = require('mongoose');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.MONGODB_URI ||
            'mongodb://localhost/' + process.env.LOCAL_DB;

if (!process.env.MONGODB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}

console.log(dbUri);
mongoose.connect(dbUri);

module.exports = mongoose;
