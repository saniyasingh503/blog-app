const redis = require('redis');
const { promisify } = require('util');
const config = require('./config');

// Create a Redis client
const redisClient = redis.createClient({
    host: config.redisHost,  // Change this if Redis is on a different host or container
    port: config.redisPort,         // Default Redis port
    legacyMode: true     // Necessary for connecting to Redis 4.x+ with certain features
});

redisClient.on('error', error =>  console.error(error))
const redisSet = promisify(redisClient.set).bind(redisClient)
const redisGet = promisify(redisClient.get).bind(redisClient)
const redisDel = promisify(redisClient.del).bind(redisClient)

module.exports = {
    redisGet,
    redisSet,
    redisDel
};
