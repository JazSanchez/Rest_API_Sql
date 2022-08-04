'use strict';

//Imported the model and datatypes and require sequelize
const { Model, DataTypes} = require('sequelize');
//Import bcrypt
const bcrypt = require('bcrypt');

//Created a model named Users
module.exports = (sequelize) => {
    class Users extends Model {}
    //Initialized the Users Model
    Users.init ({
        //Add attributes
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {//Add Validations
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
              validate: {//Add validations
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
              validate: {//Add Validations
                  notNull: {
                      msg: 'An email is required'
                  },
                 notEmpty: {
                     msg: 'Please provide a valid email'
                 }
              }
        },
        password: {
              type: DataTypes.STRING,
              allowNull: false,
              set(val) {//Use bcrypt to hash the password
                const hashedPassword = bcrypt.hashSync(val, 10);
                this.setDataValue('password', hashedPassword);
              },
              validate: {//Add Validations
                  notNull: {
                      msg: 'A password is required'
                  },
                  notEmpty: {
                      msg: 'Please provide a password'
                  }
              }

        },
    }, { sequelize });

    //Create association between the Users model and the Courses model
    Users.associate = (models) => {
      Users.hasMany(models.Courses, { foreignKey: {
          fieldName: 'userId',
          allowNull: false,
      }});
    };
    return Users;

}