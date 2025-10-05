import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/sequelize";

export class CrewMember extends Model {
  declare id: number;
  declare tenantId: number;
  declare name: string;
  declare email: string | null;
  declare phone: string | null;
  declare role: string | null;
  declare ratePerDay: number | null;
  declare meta: object;
}

CrewMember.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tenantId: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    email: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    role: DataTypes.TEXT,
    ratePerDay: DataTypes.DECIMAL(12, 2),
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "CrewMember",
    timestamps: false,
  }
);
