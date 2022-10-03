const Sequelize = require('sequelize');

const User = require('./User');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize('sqlite::memory:');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
// db.Project = Project;
User.init(sequelize);
module.exports = db;