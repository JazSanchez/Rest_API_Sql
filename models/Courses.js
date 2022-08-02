'use strict';

const { Model, DataTypes} = require ('sequelize');


module.exports = (sequelize) => {
    class Courses extends Model {}
    Courses.init ({
        title: {
            type: DataTypes.STRING,

        },
        description: {
            type: DataTypes.TEXT,
        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
             type: DataTypes.STRING,
        },
        userId: {
             type: DataTypes.STRING, 
             allowNull:false,
        }

    }, { sequelize});
    Courses.associate = (models) => {
        Courses.belongsTo(models.Users, { foreignKey:{
            fieldName: 'userId',
            allowNull: false,
        } });
    };

    return Courses;
}