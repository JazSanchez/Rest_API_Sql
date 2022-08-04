"use strict";

//Import Model and DataTypes and require sequelize
const { Model, DataTypes } = require("sequelize");

// Create a model and name it Courses
module.exports = (sequelize) => {
  class Courses extends Model {}
  //Initialize the model
  Courses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {//add Validation with messages
          notNull: {
            msg: "A title is required",
          },
          notEmpty: {
            msg: "Please provide a title",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {//add Validation with messages
          notNull: {
            msg: "A description is required",
          },
          notEmpty: {
            msg: "Please provide a description",
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize }
  );

  //Associate the Courses Model to the Users Model
  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, {
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };

  return Courses;
};
