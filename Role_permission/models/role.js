'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Role <-> User (Many-to-Many)
      Role.belongsToMany(models.User, {
        through: 'UserRoles',
        foreignKey: 'roleId',
      });

      // Role <-> Permission (Many-to-Many)
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions',
        foreignKey: 'roleId',
      });
    }
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );

  return Role;
};
