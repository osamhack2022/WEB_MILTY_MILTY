const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        usr_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          unique: true,
          autoIncrement: true,
        },
        usr_id: {
          type: Sequelize.STRING(60),
          allowNull: false,
          unique: true,
        },
        usr_password: {
          type: Sequelize.STRING(60),
          allowNull: false,
          unique: false,
        },
        usr_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        usr_birthday: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: false,
        },
        usr_division: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        usr_division_code: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
          unique: false,
        },
        usr_class: {
          type: Sequelize.CHAR(10),
          allowNull: false,
          unique: false,
        },
        classification: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
        usr_discharge_date: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
          get() {
            return moment(this.getDataValue('usr_discharge_date')).format(
              'YYYY-MM-DD',
            );
          },
        },
        usr_point: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'users',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
