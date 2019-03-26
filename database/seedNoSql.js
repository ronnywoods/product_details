const mongoose = require('mongoose');
const db = require('./indexNoSql');
const seedGenerator = require('./seedGenerator.js');
const Product = require('./modelNoSql').Product;
const Share = require('./modelNoSql').Share;

const seedNoSql = (remaining, position, callback = () => console.log('MongoDB seeded!')) => {

  db.on('error', function (err) {
    console.log('Mongo connection error', err);
  });
  db.once('open', function () {
    console.log('Connected to Mongo');
    
    const executeSeed = (remaining, position, callback) => {
      if (((position - 1) * 4) % 100000 === 0) {
        console.log(`On item ${(position - 1) * 4 + 1}`);
      }
      let chunkSize = 400; // MUST be multiple of 4
      let chunk = Math.min(remaining, chunkSize);
      let data = seedGenerator(chunk, position, false);
      return Product.insertMany(data.products).then(() => {
        return Share.insertMany(data.shares);
      }).then(() => {
        let newRemaining = remaining - chunk;
        let newPosition = position + chunkSize / 4;
        if (newRemaining === 0) {
          callback();
        } else {
          executeSeed(newRemaining, newPosition, callback);
        }
      });
    };
    executeSeed(remaining, position, callback);
  });

};

if (process.env.NODE_ENV !== 'test') {
  seedNoSql(10000000, 1, () => {
    db.close(() => console.log('database seeded and closed!'));
  });
}

module.exports = seedNoSql;