const Sequelize = require('sequelize');

const User = require('./user.model');

require('dotenv').config();

const db = {};

const sequelize = new Sequelize(
  process.env.DB_TABLE,
  process.env.DB_ID,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
// db.Project = Project;
User.init(sequelize);
module.exports = db;
