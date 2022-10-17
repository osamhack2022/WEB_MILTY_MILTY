const Sequelize = require('sequelize');

module.exports = class Time_slot extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        timeslot_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
          unique: true,
        },
        timeslot_start: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: true,
        },
        timeslot_end: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        duty_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        timeslot_point: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'time_slot',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
