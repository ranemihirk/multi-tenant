import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { Organization } from "./Organization";
import bcrypt from "bcrypt";

export class User extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: "super_admin" | "admin" | "production" | "crew";
  declare organizationId: string;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Helper to check password
  async checkPassword(plain: string) {
    return bcrypt.compare(plain, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("super_admin", "admin", "production", "crew"),
      defaultValue: "crew",
    },
    deletedAt: {
      type: DataTypes.DATE,
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
  {
    sequelize,
    modelName: "user",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

Organization.hasMany(User, { foreignKey: "organizationId" });
User.belongsTo(Organization, { foreignKey: "organizationId" });
