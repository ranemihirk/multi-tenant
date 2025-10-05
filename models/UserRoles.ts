import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";
import { Role } from "./Role";

export class UserRoles extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserRoles.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "roles" }
);

User.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: "userId",
});

Role.belongsToMany(User, {
  through: UserRoles,
  foreignKey: "roleId",
});
