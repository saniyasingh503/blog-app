require('dotenv').config();

const environments = {
  development: {
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app_dev_db',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    port: process.env.PORT || 3000,
  },
  testing: {
    nodeEnv: process.env.NODE_ENV || 'testing',
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app_test_db',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    port: process.env.PORT || 3000,
  },
  production: {
    nodeEnv: process.env.NODE_ENV,
    mongoURI: process.env.MONGODB_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    port: process.env.PORT,
  },
};

const config = environments[process.env.NODE_ENV] || environments.development;

module.exports = config;
