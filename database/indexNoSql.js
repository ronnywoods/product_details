const mongoose = require('mongoose');
let databaseName = process.env.NODE_ENV === 'test' ? 'adidasnewtest' : 'adidasnewdev';
// const credentials = require('../config.js');
// const dbUser = process.env.NODE_ENV === 'test' ? credentials.testuser : credentials.user;
// const dbPw = process.env.NODE_ENV === 'test' ? credentials.testpw : credentials.pw;

// using local database:
mongoose.connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });

// using EC2 DB instance:
// mongoose.connect(`mongodb://18.204.21.86:27017,54.174.171.238:27017,54.173.163.220:27017/${databaseName}?replicaSet=rs0`, { useNewUrlParser: true });

const db = mongoose.connection;

// May need to toggle while seeding:
module.exports = db;
// export default db;