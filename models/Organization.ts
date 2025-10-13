"use strict";
import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export class Organization extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare logo: string;
  declare plan: string;
  declare stripeId: string | null;
  declare deletedAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    logo: { type: DataTypes.STRING, defaultValue: null },
    plan: { type: DataTypes.STRING, defaultValue: "FREE" },
    stripeId: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
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
  { sequelize, modelName: "organization" }
);
