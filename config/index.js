const defaultConfig = require('./default');
const productionConfig = require('./production');

const env = process.env.NODE_ENV || 'development';

let config = defaultConfig;

if (env === 'production') {
  config = { ...defaultConfig, ...productionConfig };
}

module.exports = config; 