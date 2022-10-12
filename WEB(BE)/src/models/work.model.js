const Sequelize = require('sequelize');

module.exports = class Work extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        duty_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        usr_division_key: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        duty_list: {
          type: Sequelize.STRING(20),
          allowNull: true,
          unique: false,
        },
        duty_people_num: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'work',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
