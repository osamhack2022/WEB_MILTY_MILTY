const Sequelize = require('sequelize');

module.exports = class WorkDay extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        duty_day_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        duty_day_start: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        duty_day_end: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        usr_division_key: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        duty_people_name: {
          type: Sequelize.STRING(1000),
          allowNull: true,
          unique: false,
        },
        duty_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        duty_day: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'workday',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
