const Sequelize = require('sequelize');

/*
`duty_pid`	int	NOT NULL,
  `usr_division_key`	varchar(100)	NULL,
  `duty_list`	varchar(100)	NULL,
  `duty_people_num`	int	NULL
  */
module.exports = class Work extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      duty_pid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      usr_division_key: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      duty_list: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      duty_people_num: {
        type: Sequelize.INTEGER,
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