const Sequelize = require('sequelize');

const User = require('./User');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
// db.Project = Project;
User.init(sequelize);
module.exports = db;