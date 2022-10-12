const Sequelize = require('sequelize');


module.exports = class Make_duty extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      
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