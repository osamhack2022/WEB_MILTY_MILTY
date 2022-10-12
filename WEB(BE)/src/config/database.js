const { Sequelize } = require('sequelize');
const path = require('path');
const adminModel = require('../models/admin.model');
const loginModel = require('../models/login.model');
const requestModel = require('../models/request.model');
const userModel = require('../models/user.model');
const workModel = require('../models/work.model');
const workdayModel = require('../models/workday.model');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_TABLE,
  process.env.DB_ID,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    models: [path.join(__dirname, '../models')],
  },
);
const db = {};
db.sequelize = sequelize;

db.admin = adminModel;
db.login = loginModel;
db.request = requestModel;
db.user = userModel;
db.work = workModel;
db.workday = workdayModel;

adminModel.init(sequelize);
loginModel.init(sequelize);
requestModel.init(sequelize);
userModel.init(sequelize);
workModel.init(sequelize);
workdayModel.init(sequelize);


module.exports = db;
