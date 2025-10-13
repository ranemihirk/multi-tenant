"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import { User } from "./User";
import { Organization } from "./Organization";
import { Project } from "./Project";

export class Task extends Model {
  declare id: number;
  declare tenantId: number;
  declare projectId: number;
  declare title: string;
  declare description: string;
  declare assigneeId: number | null;
  declare status: string;
  declare priority: string;
  declare dueDate: Date | null;
  declare metadata: object;
}

Task.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: {
      type: DataTypes.BIGINT,
      references: { model: Organization, key: "id" },
    },
    projectId: {
      type: DataTypes.BIGINT,
      references: { model: Project, key: "id" },
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    description: DataTypes.TEXT,
    assigneeId: {
      type: DataTypes.BIGINT,
      references: { model: User, key: "id" },
    },
    status: { type: DataTypes.TEXT, defaultValue: "todo" },
    priority: { type: DataTypes.TEXT, defaultValue: "medium" },
    dueDate: DataTypes.DATE,
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
  },
  { sequelize, modelName: "Task", timestamps: false }
);
