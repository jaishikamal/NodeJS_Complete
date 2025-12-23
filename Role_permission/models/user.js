'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User <-> Role (Many-to-Many)
      User.belongsToMany(models.Role, {
        through: 'UserRoles',
        foreignKey: 'userId',
      });

      // User -> Product (One-to-Many)
      User.hasMany(models.Product, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
