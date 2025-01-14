require('dotenv').config();

const environments = {
  development: {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app_dev_db',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    port: process.env.PORT || 3000,
  },
  testing: {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app_test_db',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    port: process.env.PORT || 3000,
  },
  production: {
    mongoURI: process.env.MONGODB_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    port: process.env.PORT,
  },
};

const config = environments[process.env.NODE_ENV] || environments.development;

module.exports = config;
