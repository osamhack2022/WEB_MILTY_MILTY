const Sequelize = require('sequelize');
/*
`request_pid`	int	NOT NULL,
  `request_list`	varchar2(30)	NULL,
  `request_duty`	date	NULL,
  `request_reason`	varchar2(100)	NULL,
  `request_day`	date	NULL,
  `request_user`	int	NULL,
  `request_changes`	int	NULL
*/
module.exports = class Login extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        request_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        request_list: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        request_duty: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        request_reason: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        request_day: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        request_user: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
        request_changes: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
        request_check: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'request',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
