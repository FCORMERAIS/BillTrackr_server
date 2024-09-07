'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
// const { createClient } = require('redis');
console.log(config)
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file.indexOf('index.js') === -1 &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 && 
      file.indexOf('controller') === -1 && 
      file.indexOf('service') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// const client = createClient({
//   password: 'cNyOEFQvFGK2irntFhGVYQjCa45NHXJh',
//   socket: {
//     host: 'redis-14395.c59.eu-west-1-2.ec2.redns.redis-cloud.com',
//     port: 14395
//   }
// });

// client.connect().catch(console.error);

// db.redisClient = client;

module.exports = db;