'use strict';
const { Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Model {}
    Users.init ({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        lastName: {
              type: DataTypes.STRING,
              allowNull: false,
        },
        emailAddress:{
              type: DataTypes.STRING,
              allowNull: false,
        },
        password: {
              type: DataTypes.STRING,
              allowNull: false,

        },
    }, { sequelize });

    Users.associate = (models) => {
      Users.hasMany(models.Courses, { foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      }});
    };
    return Users

}