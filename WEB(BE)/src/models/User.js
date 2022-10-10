const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.STRING(20),
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            user_password: {
                type: Sequelize.STRING(60),
                allowNull: false,
                unique: false
            },
            user_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            user_birthday: {
                type: Sequelize.DATE,
                allowNull: true,
                unique: false
            },
            user_divsion: {
                type: Sequelize.STRING(20),
                allowNull: true,
                unique: false
            },
            user_divsion_code: {
                type: Sequelize.INTEGER(10),
                allowNull: true,
                unique: false
            },
            user_class: {
                type: Sequelize.CHAR(10),
                allowNull: true,
                unique: false
            },
            user_discharge_date: {
                type: Sequelize.DATE,
                allowNull: true,
                unique: false
            },
        },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'User',
                tableName: 'user',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            });
    }
};