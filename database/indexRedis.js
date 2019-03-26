const redis = require('redis');
const cache = redis.createClient();

cache.on('connect', function() {
  console.log('Redis client connected');
});

cache.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

module.exports = cache;