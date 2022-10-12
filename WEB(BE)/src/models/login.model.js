const Sequelize = require('sequelize');

module.exports = class Login extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      login_pid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
      },
      login_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      login_pw: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: false
      },
      usr_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false
      },
      usr_birthday: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false
      },
      usr_divsion: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: false
      },
      usr_divsion_code: {
        type: Sequelize.INTEGER(10),
        allowNull: true,
        unique: false
      },
      usr_class: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        unique: false
      },
      usr_discharge_date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false
      },

    },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'milly',
        tableName: 'login',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      });
  }
};