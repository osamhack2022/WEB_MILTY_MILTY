const Sequelize = require('sequelize');

module.exports = class Exempt extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        exempt_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
          unique: true,
        },
        exempt_division_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        usr_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        user_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        exempt_start: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        exempt_end: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        exempt_type: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'exempt',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};