const Sequelize = require('sequelize');

module.exports = class Admin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        admin_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        admin_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        usr_division_key: {
          type: Sequelize.STRING(20),
          allowNull: true,
          unique: false,
        },
        admin_position: {
          type: Sequelize.STRING(20),
          allowNull: true,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'admin',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
