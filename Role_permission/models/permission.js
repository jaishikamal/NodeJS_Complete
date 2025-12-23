'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // Permission <-> Role (Many-to-Many)
      Permission.belongsToMany(models.Role, {
        through: 'RolePermissions',
        foreignKey: 'permissionId',
      });
    }
  }

  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );

  return Permission;
};
