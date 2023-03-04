//getting the mongoose methods/libraries
const { connect, connection } = require('mongoose');

//connecting to the local host mongo server, and to the database name
connect('mongodb://localhost:27017/social-network-DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;