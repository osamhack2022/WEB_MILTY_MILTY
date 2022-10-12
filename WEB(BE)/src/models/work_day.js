const Sequelize = require('sequelize');

/*
  `duty_day_pid`	int	NOT NULL,
  `duty_day_start`	date	NULL,
  `duty_day_end`	date	NULL,
  `usr_division_key`	varchar(100)	NULL,
  `duty_people_name`	varchar(100)	NULL,
  `duty_pid`	int	NULL,
  `duty_day`	date	NULL
*/

module.exports = class Work_day extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      duty_day_pid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      duty_day_start: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true
      },
      duty_day_end: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true
      },
      usr_division_key: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      duty_people_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      duty_pid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      duty_day: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true
      }
    },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'User',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      });
  }
};