'use strict';
const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize) => {
    class Users extends Model {}
    Users.init ({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'A Name is required '
                },
                notEmpty:{
                    msg: 'Please provide a name'
                }
            }

        },
        lastName: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notNull: {
                      msg: 'A Last Name is required'
                  },
                  notEmpty: {
                      msg: 'Please provide a last name'
                  }
              }
        },
        emailAddress:{
              type: DataTypes.STRING,
              allowNull: false,
              unique: {
                  msg: 'The email you entered already exists'
              },
              validate: {
                  notNull: {
                      msg: 'An email is required'
                  },
                 notempty: {
                     msg: 'Please provide an email'
                 }
              }
        },
        password: {
              type: DataTypes.STRING,
              allowNull: false,
              set(val) {
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
              },
              validate: {
                  notNull: {
                      msg: 'A password is required'
                  },
                  notempty: {
                      msg: 'Please provide a password'
                  }
              }

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