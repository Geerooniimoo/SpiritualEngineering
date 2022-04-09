const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Users extends Model {};

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ip: {
            type:DataTypes.STRING,
            allowNull: false
        },
        answers: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        visits: {
            type:DataTypes.INTEGER,
            defaultValue: 0
        },
        lastVisit: {
            type: DataTypes.DATE,
            defaultValue: new Date
        }
    },
    {
        sequelize,
        timestamps: false,
        freeTableName: true,
        underscored: true,
        modelName: 'users'
    }
)

module.exports = Users;